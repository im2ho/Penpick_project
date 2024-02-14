import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../css/PrevFresh.css";

export default function PrevFresh() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [reservation, setReservation] = useState(null); // 예약 정보 상태
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false); // 사용자 데이터 로드 여부 상태

  // 세션에 저장된 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUser(res.data);
        setIsUserDataLoaded(true);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
        // 401 오류 발생 시 사용자에게 로그인 후 이용해달라는 알림 표시
        if (err.response.status === 401) {
          alert("로그인 후 이용해주세요.");
          navigate("/Login");
        }
      }
    };
    fetchUserData();
  }, [navigate]);

  // 사용자 ID로 예약 정보 불러오기
  useEffect(() => {
    if (user && isUserDataLoaded) {
      const fetchReservationData = async () => {
        try {
          const getReservation = await axios.get(
            "http://localhost:8282/reservation/reservationIds",
            {
              withCredentials: true,
              params: {
                id: user.id, // 사용자 ID를 id로 변경
              },
            }
          );
          setReservation(getReservation.data);
        } catch (error) {
          console.log("예약을 불러오지 못했습니다.", error);
        }
      };
      fetchReservationData();
    }
  }, [user, isUserDataLoaded]);

  useEffect(() => {
    // 사용자 데이터를 불러왔고, 사용자가 로그인하지 않은 경우
    if (isUserDataLoaded && user === null) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }, [user, isUserDataLoaded, navigate]);

  useEffect(() => {
    // 사용자가 로그인한 경우이고, 예약 내역이 없는 경우
    if (
      isUserDataLoaded &&
      user !== null &&
      reservation !== null &&
      reservation.length === 0
    ) {
      const confirmMessage =
        "예약하신 펜션 내역이 없습니다. 예약 후 이용해주세요. \n펜션 리스트로 이동하시겠습니까?";
      if (window.confirm(confirmMessage)) {
        navigate("/PensionList?region=경기");
      } else {
        navigate("/");
      }
    }
  }, [user, isUserDataLoaded, reservation, navigate]);

  // 예약으로 이동하는 함수
  const move = (resId) => {
    navigate("/FreshHome", {
      state: {
        id: resId,
      },
    });
  };

  return (
    <div>
      <div className="logo__container">
        <Header />
      </div>
      <div className="fresh_res_list">
        <h1 style={{ marginTop: 140, marginBottom: 20, textAlign: "center" }}>
          주문하실 예약 장소를 선택해주세요 {console.log("유저", user)}
        </h1>
        <h6>주문은 퇴실 날짜 2일 전까지만 가능합니다.</h6>
        {reservation !== null ? (
          reservation.length > 0 ? (
            <ul className="reservation__container">
              {reservation.map((reservation) => (
                <li key={reservation.id} className="reservation">
                  <button
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                      backgroundColor: "#f0f0f0", // 배경색을 연한 회색으로 지정
                      color: "#333", // 글꼴 색상을 어두운 회색으로 지정
                      padding: "8px 16px", // 안쪽 여백을 추가하여 버튼 크기 조정
                      border: "1px solid #ccc", // 얇은 회색 테두리 추가
                      borderRadius: 4, // 버튼을 둥글게 만듦
                      cursor: "pointer", // 마우스 커서를 포인터로 변경하여 클릭 가능함을 나타냄
                      outline: "none", // 클릭 시 포커스 효과 제거
                    }}
                    onClick={() => move(reservation.id)} // 이 부분을 수정했습니다.
                  >
                    <span
                      className="reservation_id"
                      style={{ marginRight: 15 }}
                    >
                      예약 번호: {reservation.id}
                    </span>
                    <span className="roomType" style={{ marginRight: 15 }}>
                      방 종류: {reservation.roomType}
                    </span>
                    <span className="CheckIn" style={{ marginRight: 15 }}>
                      입실 날짜:
                      {new Date(reservation.checkInDay).toLocaleDateString()}
                    </span>
                    <span className="CheckOut">
                      퇴실 날짜:
                      {new Date(reservation.checkOutDay).toLocaleDateString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null
        ) : null}
      </div>
    </div>
  );
}