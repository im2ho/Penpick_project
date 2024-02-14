import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/PasswordModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

const PasswordModal = ({ isOpen, onClose }) => {
  //현재 비밀번호
  const [currentPassword, setCurrentPassword] = useState("");

  // 새로운 비밀번호
  const [newPassword, setNewPassword] = useState("");

  // 새로운 비밀번호 확인
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // 닫기(X) 버튼 누를시 입력값 초기화
  const resetFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  //로그인한 사용자 비밀번호
  //로그인한 사용자 정보 받아오기
  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (err) {
        console.error("로그인 정보를 불러오지 못했습니다", err);
      }
    };
    fetchUserData();
  }, []);

  //새 비밀번호, 비밀번호 확인 값 변경될 때마다 일치 확인 함수 호출
  useEffect(() => {
    passwordCheck();
  }, [newPassword, confirmNewPassword]);

  //비밀번호 확인 문구
  const passwordCheck = () => {
    const newPasswordValue = $("#new-password-input").val();
    const confirmNewPasswordValue = $("#confirm-new-password-input").val();

    if (newPasswordValue === confirmNewPasswordValue) {
      $("#pwConfirm").text("비밀번호 일치").css("color", "green");
    } else {
      $("#pwConfirm").text("비밀번호가 일치하지 않습니다").css("color", "red");
    }
  };

  // 비밀번호 변경 정보 서버로 전송
  const handleChangePassword = async () => {
    // 비밀번호 일치 여부 확인
    const newPasswordValue = $("#new-password-input").val();
    const confirmNewPasswordValue = $("#confirm-new-password-input").val();

    if (newPasswordValue !== confirmNewPasswordValue) {
      alert("변경할 비밀번호 확인 값이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8282/api/user/changePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      alert("비밀번호가 변경되었습니다");
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("비밀번호 변경 실패", error);
      //콘솔창 보고 파악 필요..
      alert("현재 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className={`password-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content" id="pw-modal-content">
        <button
          class="btn-close"
          onClick={() => {
            onClose();
            resetFields();
          }}
        />
        <br />
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
          비밀번호 재설정
        </h3>
        <br />

        <label id="current-password-info">현재 비밀번호</label>
        <input
          type="password"
          name="currentPassword"
          id="current-password-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <br />

        <label id="new-password-info">새 비밀번호</label>
        <input
          type="password"
          name="newPassword"
          id="new-password-input"
          value={newPassword}
          onInput={passwordCheck}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />

        <label id="confirm-new-password-info">새 비밀번호 확인</label>
        <input
          type="password"
          name="confirmNewPassword"
          id="confirm-new-password-input"
          value={confirmNewPassword}
          onInput={passwordCheck}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <span
          id="pwConfirm"
          style={{
            marginTop: "2px",
            color: "gray",
            fontSize: "small",
          }}
        />
        <br />
        <br />

        <button id="changePassword-button" onClick={handleChangePassword}>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
