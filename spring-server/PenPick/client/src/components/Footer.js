import React from 'react';
import logo from '../img/펜픽로고.png';

function Footer() {
  return (
    <div id='FooterContainer'>
      <div id='footer'>
        <div id='FooterBox'>
          <img id='footerlogo' src={logo} alt='logo' />
          <p id='Footercopylight'>
            &copy; (주)penpick 대표이사 김가을 | 사업자 정보확인
          </p>
          <p id='FooterAdress'>주소 | 서울특별시 강남구 역삼동</p>
          <p id='FooterAdress'>전자우편주소 | help@penpick.kr</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
