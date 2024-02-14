import React, { useState } from 'react';
import '../css/Game.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useLocation } from 'react-router';
import lottoimg from '../img/로또.png';
import lever from '../img/레버.png';
import coinimg from '../img/coin2.png';

function RandomballGame() {
  const location = useLocation();
  const lottonum1 = location.state?.number1;
  const lottonum2 = location.state?.number2;
  const lottonum3 = location.state?.number3;
  const lottonum4 = location.state?.number4;

  const [spinning, setSpinning] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    number1: '',
    number2: '',
    number3: '',
    number4: '',
  });
  const totalNumbers = 10; // 전체 번호의 개수를 지정합니다.

  // startSpin 함수는 룰렛을 돌리는 역할을 합니다.
  const startSpin = () => {
    if (!spinning) {
      // 1부터 totalNumbers 사이의 랜덤한 번호를 8번 선택합니다.
      const randomNumbers = Array.from(
        { length: 4 },
        () => Math.floor(Math.random() * totalNumbers) + 1
      );

      setSpinning(true);

      setTimeout(() => {
        setSpinning(false);
        // 선택된 랜덤한 번호들을 각각의 번호에 할당합니다.
        setSelectedOptions({
          number1: randomNumbers[0],
          number2: randomNumbers[1],
          number3: randomNumbers[2],
          number4: randomNumbers[3],
        });
      }, 3000); // 3초 동안 돌리도록 설정합니다. (필요에 따라 조절 가능)
    }
  };

  return (
    <div>
      <Header />
      <div id='lottobigcontainer'>
        <div id='lottosecondContainer'>
          <div id='gameCoinANDTitle'>
            <a href='/GameLand'>
              <span id='gamelandtitle'>게임랜드</span>
            </a>
            <img src={coinimg} alt='코인' id='coinimg' />
          </div>
          <h6>다양한 미니게임을 통해 점수를 얻어봐요!</h6>
          <h6>행운이 따른다면 자그마한 선물이....?</h6>
          <div id='lottoSubmit'>
            <div id='lottoformcontainer'>
              <span id='windowpopbutton1'>_</span>
              <span id='windowpopbutton2'>ㅁ</span>
              <a href='GameLand'>
                <span id='windowpopbutton3'>X</span>
              </a>
              <span id='lottogametitle'>행운의 공 뽑기</span>
              <img
                src={lottoimg}
                alt='로또 공 추첨'
                id='lottoballgameimg'
              ></img>
              <div id='lottoballs'>
                {/* 선택된 번호들을 화면에 표시합니다. */}
                {Object.values(selectedOptions).map((option, index) => (
                  <div key={index}>
                    <div className={`lotto${index}`}>
                      {' '}
                      {option ? option : <span id='lottoQ'>?</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className='roulette-container'>
                <div
                  className={`roulettewheel ${
                    spinning ? 'roulettespinning' : ''
                  }`}
                ></div>
                {/* 선택된 번호들을 결과로 표시합니다. */}
                {Object.values(selectedOptions).some(
                  (option) => option !== ''
                ) && (
                  <div id='rouletteresult'>
                    <div id='lottoballtitle'>내 번호</div>
                    <div id='lottoball1'>{lottonum1}</div>
                    <div id='lottoball2'>{lottonum2}</div>
                    <div id='lottoball3'>{lottonum3}</div>
                    <div id='lottoball4'>{lottonum4}</div>
                    {/* <span id='resultball'>
                      당첨된 번호: {Object.values(selectedOptions).join(', ')}
                    </span> */}
                  </div>
                )}
                {selectedOptions.number1 === '' ? (
                  <button
                    onClick={startSpin}
                    disabled={spinning}
                    id='roulettebutton'
                  >
                    {/* <h5 id='spinningment'>{spinning ? '돌리는 중...' : ''}</h5> */}
                    <br />
                    <img src={lever} alt='레버' id='leverimg' />
                  </button>
                ) : (
                  <a href='GameLand' id='returnGameland'>
                    돌아가기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default RandomballGame;