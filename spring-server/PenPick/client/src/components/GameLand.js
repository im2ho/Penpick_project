import React from 'react';
import Header from './Header';
import lottoimg from '../img/로또.png';
import coinimg from '../img/coin2.png';
import fortuneImg from '../img/포춘쿠키들3.png';
import fortuneImg2 from '../img/포춘쿠키들2.png';

function GameLand() {
  return (
    <div>
      <Header />
      <div id='GamelandContainer'>
        <div id='GamelandSecondContainer'>
          <a href='/GameLand'>
            <span id='gamelandtitle'>게임랜드</span>
          </a>
          <img src={coinimg} alt='코인' id='coinimg' />
          <div>
            <h6 id='gamedescription'>
              다양한 미니게임을 통해 점수를 얻어봐요!
            </h6>
            <h6>행운이 따른다면 자그마한 선물이....?</h6>
          </div>
          <div id='GameLandcontainer'>
            <span id='windowpopbutton1'>_</span>
            <span id='windowpopbutton2'>ㅁ</span>
            <a href='GameLand'>
              <span id='windowpopbutton3'>X</span>
            </a>
            <span id='lottonumbertitle'>원하는 게임을 선택해주세요</span>
            <div id='gamelandgrid'>
              <div id='gamelandtype1box'>
                <a href='Randomnumber' id='RouleletteLink'>
                  <img src={lottoimg} id='lottoimg' alt='로또게임' />
                  <div id='onegameball'></div>
                  <h6 id='gamelandtype1'>행운의 공뽑기</h6>
                </a>
                <h6 id='gamelanddescription'>
                  랜덤으로 나오는 숫자는 무엇일까요?
                  <br />
                  당신의 행운을 시험해보세요!
                </h6>
              </div>
              <div id='gamelandtype1box'>
                <a href='FortuneCookie' id='RouleletteLink'>
                  <img src={fortuneImg} id='fortuneImg2' alt='로또게임' />
                  <h6 id='gamelandtype1'>오늘의 운세</h6>
                </a>
                <h6 id='gamelanddescription'>
                  오늘 당신의 운세는 무엇일까요?
                  <br />
                  포춘쿠키로 운세를 확인해봐요!
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLand;