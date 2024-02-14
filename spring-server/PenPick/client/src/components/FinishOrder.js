import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/order.css";
import Header from "./Header";

export default function FinishOrder() {
  const sessionResnum = window.sessionStorage.getItem("id");

  const [id, setId] = useState(sessionResnum || "");
  console.log("번호는", id);
  //결제내역
  const [finishOrder, setFinishOrder] = useState([]);

  const [total, setTotal] = useState(0);

  //결제내역 불러오기
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const regOrder = await axios.get(
          "http://localhost:8282/freshorder/FreshOrderIds",
          {
            withCredentials: true,
            params: {
              resnum: id,
            },
          }
        );
        setFinishOrder(regOrder.data);
        console.log(regOrder.data);
      } catch (error) {
        console.log("카트를 불러오지 못했습니다.", error);
      }
    };
    fetchOrderData();
  }, [id]);

  //전체 합산 계산하기
  useEffect(() => {
    let t = 0;

    finishOrder.forEach(({ itemPrice, itemCount }) => {
      t += itemPrice * itemCount;
    });

    setTotal(t);
  }, [finishOrder]);

  return (
    <div>
      <div className="logo__container">
        <Header />
      </div>
      <div className="fresh_order">
        <div className="order__list__container">
          <h1>결제 내역</h1>
          <h4 className="reservation__number">예약 번호 : {id}</h4>
          <ul className="order__list">
            {finishOrder.map((finish) => (
              <li key={finish.resnum} className="order__item">
                <p>{finish.itemName}</p>
                <p>{finish.itemCount}개</p>
                <p>{finish.itemPrice}원</p>
                <p>{finish.itemCount * finish.itemPrice}원</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="divider" />
        <div className="order__footer">
          <div />
          <div>
            <p className="total">총 가격 : {total}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
