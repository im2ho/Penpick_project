import React, { useState, useEffect, useRef } from "react";
import "../css/Login.css";
import logo from "../img/펜픽로고.png";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import "bootstrap/dist/css/bootstrap.min.css";
import kakaoLoginLogo from "../img/kakao_login_medium_narrow.png";
import NaverLoginLogo from "../img/naver_login_medium_narrow.png";
import styled from "styled-components";
import Header from "./Header";

export default function SignUp() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  //이메일(일반) 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8282/login",
        { userEmail, password },
        { withCredentials: true }
      );
      console.log(response.data); // 로그인 성공 메시지 또는 실패 메시지
      alert("펜픽에 오신 것을 환영합니다");
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("로그인 오류", error);
      alert("아이디와 비밀번호를 확인해주세요");
    }
  };

  //카카오 로그인 처리 함수 --------------------------------------------------
  const kakaoLoginSuccess = (res) => {
    // Kakao 로그인 성공 시에 서버로 데이터 전송
    const { access_token } = res.response;

    // 카카오 API를 통해 사용자 정보를 가져오기
    axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((userInfoResponse) => {
        const email = userInfoResponse.data.kakao_account.email;
        const nickname = userInfoResponse.data.properties.nickname;
        console.log("email", email);
        console.log("nickname", nickname);

        // 서버로 access_token , email, nickname 전송
        axios
          .post(
            "http://localhost:8282/api/kakao-login",
            {
              access_token: access_token,
              email: email,
              nickname: nickname,
            },
            {
              withCredentials: true,
            }
          )
          .then((serverResponse) => {
            console.log(serverResponse.data);
            alert("펜픽에 오신 것을 환영합니다");
            window.location.href = "http://localhost:3000/";
          })
          .catch((error) => {
            console.error(error);
            alert(
              "카카오 로그인 서버 연결에 실패했습니다. 잠시 뒤에 다시 시도해주세요."
            );
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const kakaoLoginFailure = (err) => {
    console.log(err);
  };

  //네이버 로그인 처리 함수 --------------------------------------------------

  //useRef 선언
  const naverRef = useRef();

  const NAVER_CLIENT_ID = "JOrgTkSms_oef7S497wp";
  const NAVER_CALLBACK_URL = "http://localhost:3000/login";

  //네이버 로그인 초기화
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false, //팝업창 로그인 X
      loginButton: { color: "green", type: 3, height: 45 },
      callbackHandle: true,
    });

    //네이버 로그인 시작
    naverLogin.init();

    //로그인 상태 확인 및 사용자 정보 추출
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userid = naverLogin.user.email;
        const username = naverLogin.user.nickname;

        console.log(userid);
        console.log(username);

        sendNaverUserInfoToServer({ userid, username });
      }
    });
  };

  const sendNaverUserInfoToServer = async (userInfo) => {
    try {
      await axios
        .post(
          "http://localhost:8282/api/naver-login",
          {
            email: userInfo.userid,
            nickname: userInfo.username,
          },
          {
            withCredentials: true,
          }
        )
        .then((serverResponse) => {
          console.log(serverResponse.data);
          alert("펜픽에 오신 것을 환영합니다");
          //window.location.href="/";
          window.location.replace("/");
        })
        .catch((error) => {
          console.error(error);
          alert(
            "네이버 로그인 서버 연결에 실패했습니다. 잠시 뒤에 다시 시도해주세요."
          );
        });
    } catch (error) {
      console.error("서버 요청 실패:", error);
    }
  };

  // const userAccessToken = () => {
  //     window.location.href.includes('access_token') && getToken()
  // }

  //   const getToken = () => {
  //         const token = window.location.href.split('=')[1].split('&')[0]

  //         console.log(token);

  //         // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
  //         // setGetToken(token)
  // }

  const handleNaverLogin = () => {
    initializeNaverLogin();
    naverRef.current.children[0].click();
  };

  //-------------------------------------------------------------------------

  return (
    <div>
      <Header />
      <div className="main">
        <form id="loginForm" method="get" action="/login">
          <img
            src={logo}
            alt="로고"
            style={{ width: "180px", margin: "auto" }}
          />
          <p id="emailLoginTitle">
            <strong>이메일로 펜픽하기</strong>
          </p>
          <hr style={{ marginBottom: "30px" }} />
          <label
            style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
          >
            이메일
          </label>
          <div class="dot-badge"></div>
          <input
            id="emailInput"
            type="email"
            class="form-control"
            placeholder="yourEmail@penpick.co.kr"
            name="input_id"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <br />
          <label
            style={{ float: "left", fontSize: "small", marginLeft: "2px" }}
          >
            비밀번호
          </label>
          <div class="dot-badge"></div>
          <input
            id="passwordInput"
            type="password"
            class="form-control"
            placeholder="password"
            name="input_pw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/rest-password" id="reset-password">
            비밀번호 재설정
          </a>
          <button id="loginButton" type="button" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <div
          id="social-login-line"
          style={{
            width: "430px",
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Other
        </div>
        {/* 카카오 로그인 버튼 */}
        <KakaoLogin
          //JS RESTApi key
          token="e37a82e7e5d11141f3bac76816aec5e7"
          onSuccess={kakaoLoginSuccess}
          onFailure={kakaoLoginFailure}
          render={(props) => (
            <button
              alt="KakaoLoginButton"
              onClick={props.onClick}
              style={{
                border: "none",
                background: "#FEE500",
                width: "400px",
                borderRadius: "7px",
              }}
            >
              <img src={kakaoLoginLogo} alt="카카오로그인" />
            </button>
          )}
        />
        <br />
        <br />
        {/* 네이버 로그인 버튼 */}
        <NaverIdLogin ref={naverRef} id="naverIdLogin" />
        <NaverLoginBtn onClick={handleNaverLogin}>
          <img
            src={NaverLoginLogo}
            alt="네이버로그인 로고"
            id="naverLogin-button"
          />
        </NaverLoginBtn>
        <div id="signUpMessage">
          <span>계정이 없으신가요?</span>
          <a href="/signUp" style={{ color: "darkBlue", marginLeft: "10px" }}>
            이메일로 회원가입
          </a>
        </div>
      </div>
    </div>
  );
}

// 기존 로그인 버튼이 아닌 커스텀을 진행한 로그인 버튼만 나타내기 위해 작성
const NaverIdLogin = styled.div`
  display: none;
`;

const NaverLoginBtn = styled.button`
  display: flex;
  align-items: center;
  width: 400px;
  height: 45px;
  margin: auto;
  background-color: #03c75a;
  border-radius: 7px;
  border: none;
  color: white;
`;
