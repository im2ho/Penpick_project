import React, { useState, useEffect } from "react";
import "../css/MyPage.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import PasswordModal from "./PasswordModal";
import houseImage from "../img/User-Profile-PNG-Download-Image.png";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  //소셜로그인 계정 판별용
  const [hasAccessToken, setHasAccessToken] = useState(false);

  //모달창 띄우기
  const [isModalOpen, setIsModalOpen] = useState(false);

  //로그인한 사용자 정보 받아오기
  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUserInfo(res.data);
        setEditedUserInfo(res.data);

        console.log(res.data.access_token);

        if (res.data.access_token !== null) {
          setHasAccessToken(true);
        } else {
          setHasAccessToken(false);
        }
      } catch (err) {
        console.error("로그인 정보를 불러오지 못했습니다", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  //로그인한 사용자의 성별 가져오기 -> input value 세팅

  const GenderValue = (userInfo) => {
    const gender = userInfo.gender;
    if (gender === "F") {
      return "여자";
    } else {
      return "남자";
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8282/api/user/update",
        editedUserInfo,
        {
          withCredentials: true,
        }
      );

      setUserInfo(response.data);
      setIsEditing(false);
      alert("회원 정보가 수정되었습니다");
    } catch (error) {
      console.error("사용자 정보를 업데이트하지 못했습니다", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedUserInfo({ ...editedUserInfo, [e.target.name]: e.target.value });
  };

  //회원 탈퇴 버튼 함수 ------------------------------------

  const handleSignOut = async () => {
    if (window.confirm("PenPick 서비스를 탈퇴 하시겠습니까? (가지마...)")) {
      try {
        const response = await axios.delete(
          "http://localhost:8282/api/user/signOut",
          {
            withCredentials: true,
          }
        );

        alert("회원 탈퇴가 완료되었습니다");
        window.location.href = "http://localhost:3000/";
      } catch (error) {
        console.error("회원 탈퇴 불가", error);
      }
    } else {
      alert("회원 탈퇴가 취소되었습니다");
      return;
    }
  };

  //비밀번호 재설정 모달창 토글 버튼 함수------------------------

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return null;
  }

  return (
    <div>
      <Header />
      <main id="myPage-layout">
        <div id="myPage-container">
          <nav id="myPage-navigation">
            <ul id="navigation-list">
              <li id="nav-userInfo">
                <a href="/mypage">내 정보 관리</a>
              </li>
              <hr />
              <li>
                <a href="/reservationCheck">예약내역</a>
              </li>
              <hr />
              <li>
                <a href="/mypage/userInfo">찜목록</a>
              </li>
              <hr />
              <li>
                <a href="/mypage/userInfo">문의내역</a>
              </li>
              <hr />
              <li id="nav-coupon">
                <a href="/mypage/userInfo">쿠폰함</a>
              </li>
            </ul>
          </nav>
          {/* 회원 정보 뜨는 곳 */}
          <section id="myPage-content">
            <div>
              <img
                src={houseImage}
                alt="프사"
                style={{
                  float: "right",
                  width: "130px",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              />
              <p id="content-title">내 정보 관리</p>
              <br />
              <span style={{ color: "orangered", fontWeight: "bold" }}>
                {userInfo.nickname}
              </span>
              <span>님의 회원 정보</span>
            </div>
            <hr />
            {isEditing ? (
              // 수정하기 버튼 눌렀을 때 나타나는 영역
              <div>
                <label id="user-email-info">이메일</label>
                <br />
                <input
                  name="userEmail"
                  id="user-email-edit"
                  value={editedUserInfo.userEmail}
                  readOnly
                />
                <br />
                <label id="user-nickname-info">닉네임</label>
                <br />
                <input
                  type="text"
                  name="nickname"
                  id="user-nickname-edit"
                  value={editedUserInfo.nickname}
                  onChange={handleInputChange}
                />
                <br />
                <label id="user-phone-info">연락처</label>
                <br />
                <input
                  type="text"
                  name="phoneNumber"
                  id="user-phone-edit"
                  value={editedUserInfo.phoneNumber}
                  onChange={handleInputChange}
                />
                <br />
                <br />
                <div>
                  <label
                    style={{
                      float: "left",
                      fontSize: "small",
                      marginLeft: "2px",
                    }}
                  >
                    성별
                  </label>
                  <br />
                </div>
                <div class="form-check form-check-inline" id="female">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio1"
                    value="F"
                    checked={editedUserInfo.gender === "F"}
                    onChange={handleInputChange}
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
                    checked={editedUserInfo.gender === "M"}
                    onChange={handleInputChange}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    남자
                  </label>
                </div>
                <br />
                <label id="user-phone-info">생년월일</label>
                <br />
                <DatePicker
                  id="user-birth-edit"
                  selected={
                    editedUserInfo.birthday
                      ? new Date(editedUserInfo.birthday)
                      : null
                  }
                  onChange={(date) =>
                    setEditedUserInfo((prevUser) => ({
                      ...prevUser,
                      birthday: date,
                    }))
                  }
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  placeholderText="  생일을 선택해주세요"
                />
                <br />
                <button id="saveEditInfo" onClick={handleSave}>
                  변경 정보 저장
                </button>
              </div>
            ) : (
              // 수정 완료 상태 (DB에 저장된 값)
              <div>
                <label id="user-email-info">이메일</label>
                <br />
                <input
                  name="userEmail"
                  id="user-email-value"
                  value={userInfo.userEmail}
                  readOnly
                />
                <br />
                <label id="user-nickname-info">닉네임</label>
                <br />
                <input
                  id="user-nickname-value"
                  value={userInfo.nickname}
                  readOnly
                />
                <br />
                <label id="user-phone-info">휴대폰 번호</label>
                <br />
                <input
                  id="user-phone-value"
                  value={userInfo.phoneNumber}
                  readOnly
                />
                <br />
                <label id="user-gender-info">성별</label>
                <br />
                <input
                  id="user-gender-value"
                  value={GenderValue(userInfo)}
                  readOnly
                />
                <br />
                <label id="user-birthday-info">생년월일</label>
                <br />
                <input
                  id="user-birthday-value"
                  value={userInfo.birthday}
                  readOnly
                />
                <br />
                <button id="edit-button" onClick={handleEdit}>
                  회원 정보 수정
                </button>
              </div>
            )}
            <hr style={{ marginTop: "50px" }} />
            {/* 소셜로그인 계정이 아닐 때(accessToken 없음)만 변경 버튼 활성화 */}
            {hasAccessToken ? null : (
              <>
                <button id="Change-password-button" onClick={toggleModal}>
                  비밀번호 변경
                </button>
                <PasswordModal isOpen={isModalOpen} onClose={toggleModal} />
              </>
            )}
            <button id="signOut-button" onClick={handleSignOut}>
              회원 탈퇴
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
