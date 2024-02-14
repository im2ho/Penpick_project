import React, { useState } from "react";
import "../css/Login.css";
import "../css/ResetPassword.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  // 버튼 클릭 후 서버 응답을 받기까지 로딩 설정
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // 이메일 유효성 검사
    if (!isEmailValid(newEmail)) {
      setEmailErrorMessage("올바른 형식의 이메일을 입력해주세요");
    } else {
      setEmailErrorMessage("");
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true); // 버튼 클릭 후 서버 응답까지 로딩 시작

      // 이메일 유효성 검사
      if (!isEmailValid(email)) {
        alert("이메일 주소 양식을 확인해주세요");
        return;
      }

      // 서버로 이메일 전송
      const response = await axios.post(
        "http://localhost:8282/resetPassword",
        {
          email,
        },
        {
          withCredentials: true,
        }
      );

      alert(response.data); // 서버에서 보낸 비밀번호 재설정 여부에 따른 메시지
      window.location.href = "/";
    } catch (error) {
      console.error("비밀번호 재설정 실패", error);
      alert("비밀번호 재설정에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div>
      <Header />
      <div className="main">
        <form id="loginForm" method="get" action="/login">
          <p id="restePassword-title">
            <strong>비밀번호 재설정</strong>
          </p>
          <p id="resetPassword-message">
            회원가입 시 등록한 이메일 주소를 입력해 주세요.
          </p>
          <br />
          <div style={{ marginTop: "40px" }}>
            <label id="resetPassword-email-label">이메일</label>
            <div className="dot-badge"></div>
          </div>
          <input
            id="emailInput"
            type="email"
            className="form-control"
            placeholder="yourEmail@penpick.co.kr"
            name="input_id"
            value={email}
            onChange={handleEmailChange}
          />
          {emailErrorMessage && (
            <span
              style={{
                float: "right",
                marginRight: "3px",
                marginTop: "5px",
                color: "red",
                fontSize: "small",
              }}
            >
              {emailErrorMessage}
            </span>
          )}
          <br />
          <br />
          <button
            id="resetPassword-button"
            type="button"
            onClick={handleResetPassword}
            disabled={loading || !email.trim() || !isEmailValid(email)}
            className={`reset-button ${loading ? "loading" : ""}`}
          >
            {loading ? "잠시만 기다려주세요" : "확인"}
          </button>
        </form>
      </div>
    </div>
  );
}
