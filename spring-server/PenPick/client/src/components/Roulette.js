import React from "react";
import Header from "./Header";

function Roulelette() {
  return (
    <div>
      <Header />
      <div id="Rouleletteformcontainer">
        <span id="windowpopbutton1">_</span>
        <span id="windowpopbutton2">ㅁ</span>
        <a href="GameLand">
          <span id="windowpopbutton3">X</span>
        </a>
        <span id="Roulelettegametitle">행운의 룰렛돌리기</span>
      </div>
    </div>
  );
}
export default Roulelette;
