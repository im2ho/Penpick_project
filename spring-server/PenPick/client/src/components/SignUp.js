import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/SignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from "jquery";

import Header from "./Header";

export default function SignUp() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    userEmail: "",
    password: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    nickname: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationConfirmed, setIsVerificationConfirmed] = useState(false);

  // 비밀번호 정규식 체크
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // 닉네임 특수문자 제한
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/api/user", {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // 라디오 버튼 체크 함수
  const handleGenderChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, gender: value }));
  };

  const handleSendVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8282/mail",
        { mail: newUser.userEmail },
        {
          withCredentials: true,
        }
      );

      if (response.data === "existUser") {
        alert("이미 사용중인 이메일입니다");
        return;
      }
      if (response.data === "kakaoUser") {
        alert("소셜 로그인 계정입니다");
        return;
      }

      alert("인증 이메일이 전송되었습니다.");
      setVerificationCode(response.data);
      setIsVerificationSent(true);
    } catch (error) {
      console.error("인증 이메일 전송 오류", error);
    }
  };

  const handleConfirmVerification = () => {
    if (verificationCode === "") {
      alert("인증 코드를 먼저 받아주세요");
      return;
    }

    setIsVerificationConfirmed(true);
    alert("인증이 확인되었습니다");
  };

  //비밀번호 설정 정규식
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    // 비밀번호 유효성 검사
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])(?=.*[0-9]).{8,}$/;
    const isValid = passwordRegex.test(newPassword);

    // 입력된 비밀번호와 유효성 검사 업데이트
    setNewUser((prevUser) => ({ ...prevUser, password: newPassword }));
    setIsPasswordValid(isValid);
  };

  //비밀번호 확인 문구
  const passwordCheck = () => {
    if ($("#setPassword").val() === $("#checkPassword").val()) {
      $("#pwConfirm").text("비밀번호 일치").css("color", "green");
    } else {
      $("#pwConfirm").text("비밀번호가 일치하지 않습니다").css("color", "red");
    }
  };

  //가입 버튼 누를시 작동하는 함수
  const handleAddUser = async () => {
    try {
      if (!isVerificationConfirmed) {
        alert("이메일 인증을 먼저 진행해주세요");
        return;
      }

      if (!isPasswordValid) {
        alert("비밀번호가 조건에 부합하지 않습니다");
      }

      // 필수 항목 검증
      if (
        !newUser.userEmail ||
        !newUser.password ||
        !newUser.phoneNumber ||
        !newUser.gender ||
        !newUser.birthday ||
        !newUser.nickname
      ) {
        alert("모든 항목을 작성해주세요");
        return;
      }

      // 비밀번호 일치 확인
      if ($("#setPassword").val() !== $("#checkPassword").val()) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
        return;
      }

      const response = await axios.post(
        "http://localhost:8282/api/user/add",
        { ...newUser, verificationCode },
        {
          withCredentials: true,
        }
      );
      setData((prevUser) => [...prevUser, response.data]);
      setNewUser({
        userEmail: "",
        password: "",
        phoneNumber: "",
        gender: "",
        nickname: "",
      });
      setVerificationCode("");
      setIsVerificationSent(false);
      setIsVerificationConfirmed(false);
      alert("PenPick 회원가입이 완료되었습니다");
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("회원 정보 저장오류", error);
    }
  };

  return (
    <div>
      <Header />
      <div id="signUpArea">
        <div id="signUpForm">
          <div style={{ width: "100%", marginBottom: "30px" }}>
            <p id="sigh-up-title">회원가입</p>
            <p id="signUpMsg">가입을 위한 필수 정보를 입력해주세요</p>
          </div>
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              이메일
            </label>
            <div class="dot-badge"></div>
          </div>
          <input
            id="setEmail"
            type="email"
            class="form-control"
            placeholder="yourEmail@penpick.co.kr"
            name="userEmail"
            value={newUser.userEmail}
            onChange={handleInputChange}
            required
          />
          <br />
          <button id="checkEmailButton" onClick={handleSendVerification}>
            이메일 인증
          </button>
          {isVerificationSent && (
            <div>
              <label
                style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
              >
                이메일 인증번호
              </label>
              <div class="dot-badge"></div>
              <input
                id="inputEmailcode"
                class="form-control"
                type="text"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증 코드 입력"
              />
              <br />
              <button id="checkEmailButton" onClick={handleConfirmVerification}>
                인증번호 확인
              </button>
            </div>
          )}
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              비밀번호
            </label>
            <div class="dot-badge"></div>
          </div>
          <input
            id="setPassword"
            type="password"
            class="form-control"
            placeholder="최소 8자 이상"
            name="password"
            value={newUser.password}
            onInput={passwordCheck}
            onChange={handlePasswordChange}
            required
          />
          {!isPasswordValid && (
            <>
              <span
                style={{
                  float: "right",
                  marginRight: "3px",
                  marginTop: "2px",
                  color: "red",
                  fontSize: "small",
                }}
              >
                비밀번호는 알파벳과 특수문자를 포함한 8글자 이상이어야 합니다
              </span>
            </>
          )}
          <div style={{ marginTop: "40px" }}>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              비밀번호 확인
            </label>
            <div class="dot-badge"></div>
          </div>
          <input
            id="checkPassword"
            type="password"
            class="form-control"
            placeholder="비밀번호 확인"
            onInput={passwordCheck}
            onChange={handleInputChange}
            required
          />
          <span
            id="pwConfirm"
            style={{
              float: "right",
              marginRight: "3px",
              marginTop: "2px",
              color: "gray",
              fontSize: "small",
            }}
          />
          <br />
          <br />
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              연락처
            </label>
            <div class="dot-badge"></div>
          </div>
          <input
            id="setPhondeNumber"
            type="text"
            placeholder="숫자만 입력해주세요"
            class="form-control"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
          />
          <br />
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              성별
            </label>
            <div class="dot-badge"></div>
            <br />
          </div>
          <div class="form-check form-check-inline" id="female">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="F"
              onChange={handleGenderChange}
              checked={newUser.gender === "F"}
            />
            <label class="form-check-label" for="inlineRadio1">
              여자
            </label>
          </div>
          <div class="form-check form-check-inline" id="male">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="M"
              onChange={handleGenderChange}
              checked={newUser.gender === "M"}
            />
            <label class="form-check-label" for="inlineRadio2">
              남자
            </label>
          </div>
          <br />
          <br />
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              생일
            </label>
            <div class="dot-badge"></div>
          </div>
          <br />
          <DatePicker
            id="setBirthday"
            selected={newUser.birthday}
            onChange={(date) =>
              setNewUser((prevUser) => ({ ...prevUser, birthday: date }))
            }
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            placeholderText="  생일을 선택해주세요"
          />
          <br />
          <br />
          <div>
            <label
              style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
            >
              닉네임
            </label>
            <div class="dot-badge"></div>
          </div>
          <input
            id="setNickname"
            type="text"
            class="form-control"
            placeholder="닉네임 설정"
            name="nickname"
            value={newUser.nickname}
            onChange={handleInputChange}
            required
          />
          <button id="signUpButton" type="button" onClick={handleAddUser}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
