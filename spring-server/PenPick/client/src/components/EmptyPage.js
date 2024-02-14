import React from "react";
import Header from "./Header";
import warngingLogo from "../img/warngingIcon.webp";
import "../css/EmptyPage.css";

export default function EmptyPage() {
  return (
    <div>
      <Header />
      <div id="emptyPage-container">
        <img id="warning-logo" src={warngingLogo} alt="경고아이콘" />
        <h4 id="warning-title">앗! 존재하지 않는 페이지예요</h4>
        <p style={{ color: "gray" }}>
          찾고 있는 페이지 주소가 변경 또는 삭제되었을 수 있어요.
        </p>
        <br />
        <a id="back-to-home-link" href="/">
          홈으로 이동
        </a>
      </div>
    </div>
  );
}
