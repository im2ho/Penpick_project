import React, { useEffect, useState } from "react";
import axios from "axios"; // axios를 import합니다.
import Header from "./Header";
import "../css/WriteQuestion.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WriteQuestion() {
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setNickname(res.data.nickname);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      const res = await axios.post("http://localhost:8282/QnA/write-question", {
        nickname: nickname,
        questionTitle: title,
        questionContent: content,
        writtenDate: new Date(),
      });
      console.log(res.data);
      alert("문의글이 등록되었습니다.");
      window.location.href = "/QnA";
    } catch (err) {
      console.error("문의글 등록 실패", err);
      alert("문의글 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div id="QnA-container">
        <div id="QnA-header">
          <h4><strong>문의사항 보내기</strong></h4>
          <p id="QnA-description">어려움이나 궁금한 점이 있으신가요?</p>
        </div><br />
        <div id="write-question-form">
          <h4><b>문의하실 내용을 작성해주세요</b></h4><br />
          <form onSubmit={handleSubmit}>
            <div>
              <label>제목</label><br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control"
              />
            </div><br />
            <div>
              <label>내용</label><br />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-control"
                style={{height:"250px"}}
              />
            </div><br />
            <button 
              type="submit"
              className="btn primary"
              style={{float:"right"}}
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
