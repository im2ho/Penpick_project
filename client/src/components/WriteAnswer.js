import React, { useState } from "react";
import axios from "axios";
import "../css/WriteAnswer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WriteAnswer = ({ questionId }) => {
  const [answerContent, setAnswerContent] = useState("");

  const handleSubmit = async () => {
    const answerData = {
      questionId,
      answerContent,
      writtenDate: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8282/QnA/submitAnswer", answerData, {
        withCredentials: true,
      });
      alert("답변이 저장되었습니다.");
      setAnswerContent(""); // 입력 필드 초기화
      window.location.reload();
    } catch (err) {
      console.error("Error submitting answer: ", err);
      alert("답변 저장에 실패했습니다.");
    }
  };

  return (
    <div id="write-answer-form" className="container">
      <div className="form-group">
        <textarea
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          placeholder="답변을 작성해주세요."
          id="write-answer-textarea"
          className="form-control"
          style={{ width: "98%", marginLeft: "15px" }}
          rows="5"
        ></textarea>
      </div>
      <button
        onClick={handleSubmit} 
        className="btn btn-primary"
        id="write-answer-button" 
        style={{float:"right", marginRight:"10px"}}
      >
        저장
      </button>
    </div>
  );
};

export default WriteAnswer;
