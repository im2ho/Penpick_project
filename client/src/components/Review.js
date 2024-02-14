import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Review.css";

function Review() {
  const urlParams = new URLSearchParams(window.location.search);

  const seletedId = urlParams.get("id");
  console.log(seletedId);

  // 예약 내역 담을 배열
  const [userReservation, setUserReservation] = useState([]);

  // 예약 내역에 있는 유저 정보 담을 배열
  const [penpickUser, setPenpickUser] = useState([]);

  const [loading, setLoading] = useState(true);

  const [review, setReview] = useState({
    reviewId: "",
    reservation: "",
    penpickUser: "",
    nickName: "",
    reviewCreateDate: "",
    reviewText: "",
    checkInDay: "",
    checkOutDay: "",
  });

  useEffect(() => {
    const handleGetId = async () => {
      try {
        const res = await axios.get("http://localhost:8282/reservation/getId", {
          withCredentials: true,
          params: {
            userId: seletedId,
          },
        });
        console.log("난 실행중이야");
        if (res.data !== null) {
          console.log(res.data);
          setUserReservation(res.data);
        } else {
          console.log("비어있소");
        }
      } catch (err) {
        console.error(err + "난 error에요");
        console.log(err + "난 log에요");
      }
    };
    handleGetId();

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setPenpickUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("로그인 정보를 불러오지 못했습니다", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();

    console.log("나는 두번째인가?");
  }, []);

  useEffect(() => {
    if (userReservation !== null && penpickUser !== null) {
      console.log(userReservation);
      console.log(penpickUser);
      console.log(userReservation.pensions);

      console.log(penpickUser.id);
      console.log(penpickUser.nickname);
    }
  });

  // useEffect(() => {
  //   handleInputUser();
  // });

  // const handleInputUser = () => {
  //   if (userReservation !== null) {
  //     console.log(userReservation);
  //     console.log(userReservation.penpickUser);
  //     setPenpickUser(userReservation.penpickUser);
  //   }
  // };

  // const handleReviewAdd = async () => {
  //   console.log(review);
  //   try {
  //     const res = await axios.post("http://localhost:8282/review/add", {
  //       review,
  //     });
  //     console.log(review);
  //     console.log("리뷰 작성 아오!!!!!!");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleReviewAdd = async () => {
    try {
      // userReservation과 penpickUser가 null이 아닌지 확인
      if (userReservation !== null && penpickUser !== null) {
        // userReservation과 penpickUser가 null이 아니라면 ID 추출하여 newReview 객체 초기화
        const newReview = {
          // reviewId는 백엔드에서 자동으로 생성되므로 빈 값으로 둡니다.
          reservation: userReservation.id, // 예약 ID 전송
          penpickUser: penpickUser.id, // 유저 ID 전송
          nickName: penpickUser.nickname, // 리뷰어 닉네임 전송
          reviewText: review.reviewText,
          pensions: userReservation.pensions,
          reviewCreateDate: "", // 리뷰 생성 날짜는 백엔드에서 자동 생성됩니다.
          checkInDay: userReservation.checkInDay,
          checkOutDay: userReservation.checkOutDay,
        };

        // 리뷰 작성 API 호출
        const res = await axios.post(
          "http://localhost:8282/review/add",
          newReview
        );
        console.log("리뷰 작성 완료");
        console.log("입력값", newReview);
      } else {
        console.log("userReservation 또는 penpickUser가 null입니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextInput = (e) => {
    setReview({
      ...review,
      reviewText: e.target.value,
    });
    console.log(review);
  };

  console.log("첫 렌더링 끝");

  return (
    <div>
      <Header />
      <div id="review-page">
        <div id="review-add-box">
          <div>리뷰 작성</div>
          <div>
            <textarea id="review-text" onChange={handleTextInput} />
            <br />
            <Button className="btn" onClick={handleReviewAdd}>
              작성 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
