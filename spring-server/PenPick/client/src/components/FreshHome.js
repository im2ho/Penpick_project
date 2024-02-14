import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/reset-css.css";
import "../css/item.css";
import Header from "./Header";
import fresh1 from "../img/삼겹살.png";
import fresh2 from "../img/목살.png";
import fresh3 from "../img/일회.png";
import fresh4 from "../img/후추.jpg";
import fresh5 from "../img/소금.jpg";
import fresh6 from "../img/상추.jpg";
import fresh7 from "../img/쌈장.jpg";
import fresh8 from "../img/청소.jpg";

export default function FreshHome() {
  const navigate = useNavigate();
  //PrevFresh에서 useNavigate 값을 받아오기위함
  const location = useLocation();
  const resnum = location.state.id;
  console.log("뭐지", resnum);
  // 체크된 상품 목록 item_num
  const [selectedValues, setSelectedValues] = useState([]);
  // 주문 항목별 개수
  const [inputItemCount, setItemCount] = useState({});
  // 주문 목록 금액 총계
  const [totalAmount, setTotalAmount] = useState(0);
  // 주문 목록
  const [orderList, setOrderList] = useState([]);
  //사용자 불러오기
  const [User, setUser] = useState([]);
  //프레쉬 아이템
  const [freshitems, setFreshItems] = useState([]);
  // 사용자 동의 여부
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  //세션 저장
  // resnum 값이 바뀔 때마다 sessionStorage의 값도 변경하기
  useEffect(() => {
    window.sessionStorage.setItem("id", resnum);
  }, [resnum]);

  //총합 가격을 저장
  useEffect(() => {
    window.sessionStorage.setItem("totalprice", totalAmount);
  }, [totalAmount]);
  console.log("총가격은", totalAmount);

  //프레쉬 아이템 불러오기
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:8282/productItem/list"
        // );
        const tmpData = [
          { itemnum: 1, itemName: "삼겹살 150g", itemPrice: 12000 },
          { itemnum: 2, itemName: "목살 150g", itemPrice: 11000 },
          { itemnum: 3, itemName: "일회용품", itemPrice: 2000 },
          { itemnum: 5, itemName: "후추", itemPrice: 2000 },
          { itemnum: 6, itemName: "허브솔트", itemPrice: 2000 },
          { itemnum: 7, itemName: "상추", itemPrice: 1000 },
          { itemnum: 8, itemName: "쌈장", itemPrice: 1500 },
          { itemnum: 9, itemName: "뒤처리", itemPrice: 10000 },
        ];
        // setfreshitems(response.data);
        setFreshItems(tmpData);
        // console.log(response.data);
      } catch (error) {
        console.log("데이터를 불러오지 못했습니다.", error);
      }
    };
    fetchItemData();
  }, []);

  //로그인한 사용자 정보 받아오기
  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserCartData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
      }
    };
    fetchUserCartData();
  }, []);

  // 선택주문, 주문 개수, 상품 정보 목록 변경 시 새로운 order 데이터를 수립합니다.
  useEffect(() => {
    const selectedItems = selectedValues
      .filter((itemnum) => {
        return Number(inputItemCount?.[itemnum]);
      })
      .map((itemnum) => {
        const count = inputItemCount?.[itemnum] || 1;
        const targetItem =
          freshitems.find((item) => String(item?.itemnum) === itemnum) || {};
        return {
          ...targetItem,
          user_id: User.id,
          resnum: { id: resnum },
          itemCount: count,
          item_Total_Price: count * Number(targetItem.itemPrice),
        };
      });
    // 새롭게 주문예정 목록 작성
    setOrderList(selectedItems);
    const totalAmountArr = selectedItems.map((item) => item?.item_Total_Price);
    if (totalAmountArr?.length > 0) {
      const totalAmount = totalAmountArr.reduce((a, b) => a + b);
      setTotalAmount(totalAmount);
    }
  }, [selectedValues, inputItemCount, freshitems, resnum]);

  //주문하기 (고르기 클릭 시 )
  const registerAddOrder = async () => {
    if (!agreedToTerms.terms1 || !agreedToTerms.terms2) {
      alert("전체 약관에 동의해야 결제가 가능합니다.");
      return;
    }

    try {
      const jobs = orderList.map((targetItem) => {
        console.log(targetItem);
        return axios.post("http://localhost:8282/freshorder/add", targetItem, {
          withCredentials: true,
        });
      });
      console.log(orderList);
      const result = await Promise.all(jobs);
      navigate("/sandbox", {
        replace: true,
      });
      console.log(result);
    } catch (error) {
      console.error("데이터 저장오류", error);
    }
  };
  //기존 아이템정보 집어넣기
  const handleCheckboxChange = (event) => {
    const currentItemNum = event.target.value;
    //체크여부 확인
    const isChecked = event.target.checked;
    //체크 시
    if (isChecked) {
      setSelectedValues([...selectedValues, currentItemNum]);
      if (!inputItemCount?.[currentItemNum]) {
        setItemCount({ ...inputItemCount, [currentItemNum]: 1 });
      }
      //체크가 안되어있다면
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== currentItemNum));
    }
  };

  //갯수 조정
  const onChangeItemCount = (itemnum, count) => {
    // const { name, value } = e.target;
    setItemCount({ ...inputItemCount, [itemnum]: count });
    // setNewOrder(prevCartitem => ({ ...prevCartitem, [name]: value }));
  };

  const handleTermsCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setAgreedToTerms((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <div>
      <div className="logo__container">
        <Header />
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="list">
          <div className="list-item" style={{ flex: "auto" }}>
            <h1
              style={{
                marginBottom: 16,
                fontWeight: "bolder",
              }}
            >
              물품 리스트
            </h1>
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 31,
              }}
              id="fresh1"
              src={fresh1}
              alt="fresh1"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 273,
              }}
              id="fresh2"
              src={fresh2}
              alt="fresh2"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 515,
              }}
              id="fresh3"
              src={fresh3}
              alt="fresh3"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 756,
              }}
              id="fresh4"
              src={fresh4}
              alt="fresh4"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 31,
                marginTop: 290,
              }}
              id="fresh5"
              src={fresh5}
              alt="fresh5"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 273,
                marginTop: 290,
              }}
              id="fresh6"
              src={fresh6}
              alt="fresh6"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 515,
                marginTop: 290,
              }}
              id="fresh7"
              src={fresh7}
              alt="fresh7"
            />
            <img
              style={{
                position: "absolute",
                width: 190,
                height: 200,
                marginLeft: 756,
                marginTop: 290,
              }}
              id="fresh8"
              src={fresh8}
              alt="fresh8"
            />
            <ul className="item__container">
              {freshitems.map((freshitem) => (
                <li key={freshitem.itemnum} className="item">
                  {/* 사진 */}
                  <div
                    style={{
                      width: 190,
                      height: 200,
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                  {/* 설명 */}
                  <div className="description">
                    {/* 정보 */}
                    <div className="infomation">
                      <p
                        style={{
                          marginTop: 4,
                          marginBottom: 4,
                        }}
                      >
                        <input
                          id={freshitem.itemnum}
                          type="checkbox"
                          value={freshitem.itemnum}
                          style={{ marginRight: 2 }}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor={freshitem.itemnum}
                          style={{ fontSize: 15 }}
                        >
                          {freshitem.itemName || "이름 없음"}
                        </label>
                      </p>
                      <div>
                        <span
                          style={{
                            marginLeft: 14,
                            fontSize: "0.9em",
                            fontWeight: "bolder",
                          }}
                        >
                          {Number(freshitem.itemPrice).toLocaleString()}
                        </span>
                        원
                      </div>
                    </div>
                    {/* 개수 */}
                    <div className="amount">
                      <input
                        style={{
                          maxWidth: 55,
                          padding: 2,
                          marginRight: 5,
                          marginLeft: 10,
                        }}
                        type="number"
                        min={0}
                        name="itemCount"
                        placeholder="수량"
                        value={inputItemCount?.[freshitem.itemnum] || ""}
                        onChange={(e) =>
                          onChangeItemCount(freshitem.itemnum, e.target.value)
                        }
                      />
                      <p style={{ marginTop: 8 }}>개</p>
                      <div className="res_num">
                        <input
                          className="form-control"
                          type="hidden"
                          name="resnum"
                          value={resnum?.[freshitem.itemnum] || ""}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="list-item" style={{ width: "30%" }}>
            <div className="result" style={{ paddingLeft: 16 }}>
              <div></div>
              <div>
                <h1
                  style={{
                    marginBottom: 16,
                    fontWeight: "bolder",
                    textAlign: "right",
                  }}
                >
                  <strong>선택 품목</strong>
                </h1>
                {orderList?.length < 1 && (
                  <p style={{ textAlign: "center" }}>
                    먼저 상품을 선택해주세요.
                  </p>
                )}
                <ul className="select_fresh">
                  {orderList.map((targetItem) => {
                    return (
                      <li style={{ paddingTop: 4, textAlign: "right" }}>
                        <span style={{ marginRight: 8 }}>
                          {targetItem.itemName}
                        </span>
                        <span style={{ marginRight: 8 }}>
                          {Number(targetItem.itemCount).toLocaleString()}개
                        </span>
                        <span>
                          {Number(targetItem.item_Total_Price).toLocaleString()}
                          원
                        </span>
                      </li>
                    );
                  })}
                  <li>
                    <hr />
                  </li>
                  {orderList.length > 0 && (
                    <li style={{ paddingTop: 4, textAlign: "right" }}>
                      <span>
                        합계 :{" "}
                        <strong style={{ fontWeight: "bolder" }}>
                          {Number(totalAmount).toLocaleString()}
                        </strong>
                        원
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <label htmlFor="terms1">
                  <input
                    type="checkbox"
                    id="terms1"
                    checked={agreedToTerms.terms1}
                    onChange={handleTermsCheckboxChange}
                  />
                  팬픽프레쉬 서비스 약관에 동의합니다.
                </label>
                <br />
                <label htmlFor="terms2">
                  <input
                    type="checkbox"
                    id="terms2"
                    checked={agreedToTerms.terms2}
                    onChange={handleTermsCheckboxChange}
                  />
                  팬픽프레쉬 개인정보 수집 및 활용에 동의합니다.
                </label>
              </div>
              <div className="button_align" style={{ textAlign: "right" }}>
                <button
                  className="add__button"
                  onClick={registerAddOrder}
                  style={{ marginTop: 16, padding: 8, width: 365 }}
                  disabled={orderList.length === 0} // orderList가 비어 있으면 버튼을 비활성화합니다.
                >
                  결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}