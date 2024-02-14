import { Modal, CardImg, Container } from "react-bootstrap";
import "../css/Reservation.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoverImage from "../img/펜션1.jpg";
import KakaoImage from "../img/kakao.png";
import backSpaceImage from "../img/뒤로가기.jpg";
import CardImage from "../img/체크카드.PNG";
import kakaoPay from "../img/kpay.png";
import naverPay from "../img/npay.jpg";
import kbPay from "../img/kbpay.png";
import paycoPay from "../img/payco.jpg";
import Header from "./Header";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";

function Reservation() {
  const [checkInDay, setCheckInDay] = useState(new Date());

  const [checkOutDay, setCheckOutDay] = useState(new Date());

  const [reservations, setReservations] = useState([]);

  const [roomType, setRoomType] = useState("");

  const [pay, setPay] = useState("");

  const [payment, setPayment] = useState("토스페이");

  const [pick, setPick] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [pensionName, setPensionName] = useState("");

  const [people, setPeople] = useState("");

  const [purchases, setPurchases] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleShow = () => setModalIsOpen(true);

  const handleClose = () => setModalIsOpen(false);

  const [detailPension, setDetailPension] = useState([]);

  const [userNum, setUserNum] = useState("");

  const [testParam, setTestParam] = useState([]);

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

 //체크인 날짜 받기
 const inputcheckinDate = location.state?.inputcheckinDate;

 //체크아웃 날짜 받기
 const inputcheckoutDate = location.state?.inputcheckoutDate;

 // 인원수
 const peopleNumber = location.state?.peopleNumber;

 // 펜션 id
 const selectedId = location.state?.selectedId;

 // 룸 타입
 const roomType1 = location.state?.roomType;

 // 방 가격
 const roomPrice = location.state?.roomPrice;

 console.log(
   inputcheckinDate,
   inputcheckoutDate,
   peopleNumber,
   selectedId,
   roomType1,
   roomPrice
 );

  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUserInfo(res.data);
        setEditedUserInfo(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("로그인 정보를 불러오지 못했습니다", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const [isChecked, setIsChecked] = useState({
    agreement: false,
    privacyPolicy: false,
    eventNotification: false,
  });

  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setIsCheckedAll(checked);
    setIsChecked({
      agreement: checked,
      privacyPolicy: checked,
      eventNotification: checked,
    });
  };

  const handleCheckboxChange = (e, key) => {
    const { checked } = e.target;
    setIsChecked((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  useEffect(() => {
    window.sessionStorage.setItem("roomPrice",roomPrice);
  }, [roomPrice]);
  console.log("방가격", roomPrice);

  // const handleCheckboxChange = (e) => {
  //   const {value} = e.target;
  //   setReservations((prevReservations) => ({...prevReservations,pick:value}))
  // };

  // const handlePick = () => setPick(true);
  //펜션 아이디 담는곳
  useEffect(() => {
    setTestParam(selectedId);
  }, [testParam]);

  const handleReservationCheckDetailPage = (id, room, price) => {
    // 펜션 id
    const selectedId = id;

    // 룸 타입
    const roomType = room;

    // 룸 가격
    const roomPrice = price;

    console.log(id, room);
    navigate("/ReservationCheckDetail", {
      state: {
        inputcheckinDate,
        inputcheckoutDate,
        peopleNumber,
        selectedId,
        roomType,
        roomPrice,
      },
    });
  };

  //펜션 아이디 데이터 가져오기
  useEffect(() => {
    if (selectedId !== null) {
      handleDetail();
      console.log(selectedId + "이건 selectedId");
      console.log(testParam);
    } else {
      console.log("엥;");
    }
  }, [testParam]);

  const handleDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8282/penpick/details`, {
        params: {
          id: testParam,
        },
      });
      console.log(res.data);
      setDetailPension(res.data);

      console.log(testParam);
    } catch (error) {
      console.log(error);
      setDetailPension([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8282/reservation/list"
        );
        setReservations(response.data);
      } catch (error) {
        console.log("데이터를 불러오지 못했습니다.", error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const makeReservation = () => {
    if ( !pick ) {
      console.error('픽업여부를 선택하세요.');
      alert( '픽업여부를 선택하세요.');
      handleClose();
      return ;
    }
    axios
      .post("http://localhost:8282/reservation/makeReservation", {
        id : selectedId,
        email: userInfo.userEmail,
        phoneNumber: userInfo.phoneNumber,
        pick: pick,
        people: peopleNumber,
        payment: payment,
        pay: roomPrice,
        roomType: roomType1,
        checkInDay: inputcheckinDate,
        checkOutDay: inputcheckoutDate,
       
      })
      .then(() => {
        // fetchReservations();
        window.location.href = "reservation/sandbox";
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    if (!isChecked.agreement || !isChecked.privacyPolicy) {
      alert("필수 약관에 동의해야 합니다.");
      return;
    }
    makeReservation();
  };

  // 펜션 목록으로 돌아가기
  function comebackFunction() {
    window.location.href = "/pensionList";
  }

  // 고객 센터로 가기
  function serviceCenterFunction() {
    window.location.href = "/customerServiceCenterMain";
  }

  // 카카오톡 상담
  function kakaoQuestionFuction() {
    window.location.href = "/";
  }

  // 예약확인
  function reservationCheckFunction() {
    const handleReservationCheck = (userId) => {
      const selectedUser = userId;
      window.location.href = `/reservationCheck`;
    };
    window.location.href = "/reservationCheck";
  }

  return (
    <div>
      <Header />
      <div className="reservationDiv">
        <div className="comebackDiv">
          <button className="comebackButton" onClick={comebackFunction}>
            <img
              src={backSpaceImage}
              className="backSpaceImage"
              alt="돌아가기"
            ></img>
            다른 펜션 보러가기
          </button>
        </div>
        <br />
        <h1 id="reservationId">예약 및 결제</h1>
        <section className="reservationSection1">
          <label>펜션 이름 </label>
          <br />
          <lnput> {detailPension.name}</lnput> <br />
          {/* <label>이메일 </label>
          <br />
          <input
            type="text"
            placeholder="kh@co.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>{" "} */}
          <label>이메일 </label>
          <br />
          <input type='text'
          className="form-control"
          value={userInfo.userEmail}
          onChange={(e) => setEmail(e.target.value)}>
          </input><br/>
          <label>전화번호 </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="010-1234-5678 -빼고 입력"
            value={userInfo.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>{" "}
          <br />
          <label>인원 수 </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={peopleNumber}
            onChange={(e) => setPeople(e.target.value)}
          ></input>{" "}
          <br />
          <label>결제 수단 </label>
          <br />
          <select
            value={payment}
            className="form-control"
            onChange={(e) => setPayment(e.target.value)}
            disabled
          >
            <option value="토스페이">토스페이</option>
          </select>
          <br />
          <label>픽업 </label>
          <br />
          <select value={pick} className="form-control" onChange={(e) => setPick(e.target.value)}>
            <option value="null">픽업 여부 선택</option>
            <option value="픽업 O">픽업 O</option>
            <option value="픽업 X">픽업 X</option>
          </select>
          <br />
          <label>결제 금액 </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={roomPrice}
            onChange={(e) => setPay(e.target.value)}
          ></input>
          <br />
          <label>룸 타입 </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={roomType1}
            onChange={(e) => setRoomType(e.target.value)}
          ></input>
          <br />
          <label>체크인 날짜</label>
          <br />
          <input
          type='text'
          className="form-control"
          value={inputcheckinDate}
          onChange={(e) => setCheckInDay(e.target.value)}
          ></input>
           <br />
          <label>체크아웃 날짜</label>
          <br />
          <input
          type='text'
          className="form-control"
          value={inputcheckoutDate}
          onChange={(e) => setCheckOutDay(e.target.value)}
          ></input>
        </section>
        <section className="reservationSection2">
          <div className="reservationCoverImage">
            <img src={CoverImage} className="CoverImage" alt="커버이미지"></img>
          </div>
          <br />
        </section>

        <section className="reservationSection3">
          <h1 className="selectPayment">결제 수단</h1>
          <br />
          <br />
          <div className="payCheckBox">
            <input type="checkbox"></input>{" "}
            <span>이 결제수단을 다음에도 사용</span>
            <br />
          </div>

          <Modal className="Modal" show={modalIsOpen} onHide={handleClose}>
            <div className="modalDiv">
              <span>
                결제하기
                <img src={CardImage} id="cardImage" alt="카드이미지"></img>
              </span>
              <br />
              <span>펜션 이름 : {detailPension.name}</span>
              <br />
              <div className="modalTerms">
                <br />
                <span>◆이용 약관◆</span>
                <br />
                <span>15:00 부터 입실이 가능합니다.</span>
                <br />
                <span>
                  펜션 이용후 분실물에 대해서는 penpick측에서 책임지지 않습니다.
                </span>
                <br />
                <span>
                  펜션 이용시 불편사항은 펜픽 고객센터로 문의해주세요.
                </span>
                <br />
                <span>당일 환불의 경우 위약금이 발생할 수 있습니다.</span>
                <br />
                <br />
                <div className="checkTimeDiv">
                  <div className="checkTimeBox">
                    <span>체크인 : 15:00</span>
                    <br />
                    <span>체크아웃 : 11:00</span>
                  </div>
                </div>
                <div>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                    모든 약관에 동의합니다.
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      checked={isChecked.agreement}
                      onChange={(e) => handleCheckboxChange(e, "agreement")}
                    />
                    만 18세 이상이며 이용약관에 동의합니다.(필수)
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      checked={isChecked.privacyPolicy}
                      onChange={(e) => handleCheckboxChange(e, "privacyPolicy")}
                    />
                    개인정보 보호정책에 따른 개인정보 수집 및 사용에
                    동의합니다.(필수)
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      checked={isChecked.eventNotification}
                      onChange={(e) =>
                        handleCheckboxChange(e, "eventNotification")
                      }
                    />
                    이벤트 공지 SMS 및 Email 수신에 동의합니다.(선택)
                  </label>
                </div>
              </div>
              <button id="modalPayButton" type="submit" onClick={handleSubmit}>
                결제하기
              </button>
              <button id="modalCancleButton" onClick={handleClose}>
                취소하기
              </button>
            </div>
          </Modal>

          <div className="buttonBox">
            <button id="payButton" onClick={handleShow}>
              결제하기
            </button>

            {/* <button id='payButton' onClick={handleShow}>
            휴대폰 결제
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={kakaoPay} id='kakaoPay' alt='카카오페이'></img>
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={naverPay} id='naverPay' alt='네이버 페이'></img>
          </button>{' '}
          <tr />
          <br />
          <button id='payButton' onClick={handleShow}>
            <img src={kbPay} id='kbPay' alt='kb 페이'></img>
          </button>
          <button id='payButton' onClick={handleShow}>
            <img src={paycoPay} id='paycoPay' alt='payco 페이'></img>
          </button>*/}
          </div>
        </section>
        <section className="reservationSection4">
          <button id="serviceCenterButton" onClick={serviceCenterFunction}>
            고객센터
          </button>
          <br />
          <button id="kakaoQuestionButton" onClick={kakaoQuestionFuction}>
            <img src={KakaoImage} id="kakaoQuestion" alt="카카오 상담"></img>
            카카오톡 상담
          </button>
        </section>
      </div>
    </div>
  );
}

export default Reservation;