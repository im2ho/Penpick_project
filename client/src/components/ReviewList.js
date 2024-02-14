import React, { useState, useEffect } from "react";
import "../css/DetailsPage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ReviewList() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const selectedId = urlParams.get("id");

  const location = useLocation();

  //체크인 날짜 받기
  const inputcheckinDate = location.state?.inputcheckinDate;

  //체크아웃 날짜 받기
  const inputcheckoutDate = location.state?.inputcheckoutDate;

  // 인원수
  const peopleNumber = location.state?.peopleNumber;

  // 펜션 id
  const selectedId = location.state?.selectedId;
  console.log(selectedId);

  const [review, setReview] = useState([]);

  useEffect(() => {
    console.log("안녕");
    const handleReview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8282/review/detailReview`,
          {
            params: {
              pensionsId: selectedId,
            },
          }
        );
        console.log(res + "아니");
        console.log(res.data);
        setReview(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleReview();
    console.log(review);
  }, []);

  useEffect(() => {
    console.log(review);
  }, [review]);

  return (
    <div>
      {review.map((reviews) => (
        <div key={reviews.id}>
          <div>{reviews.reviewText}</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
