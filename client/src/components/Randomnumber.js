import React, { useState } from 'react';
import '../css/Game.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useNavigate } from 'react-router';
import coinimg from '../img/coin2.png';

function RandomNumber() {
  // spinning 상태와 선택된 번호를 저장하는 selectedOptions 상태를 정의합니다.
  const [userChooseNumber, SetUserChooseNumber] = useState({
    number1: '',
    number2: '',
    number3: '',
    number4: '',
  });

  const updateUserChooseNumber = (newValue) => {
    SetUserChooseNumber((prevUserChooseNumber) => ({
      ...prevUserChooseNumber,
      ...newValue,
    }));
  };
  const navigate = useNavigate();

  const handlesubmit = () => {
    if (
      userChooseNumber.number1 !== '' &&
      userChooseNumber.number2 !== '' &&
      userChooseNumber.number3 !== '' &&
      userChooseNumber.number4 !== ''
    ) {
      navigate('/RandomballGame', {
        state: {
          number1: userChooseNumber.number1,
          number2: userChooseNumber.number2,
          number3: userChooseNumber.number3,
          number4: userChooseNumber.number4,
        },
      });
    } else {
      alert('로또번호를 다 입력하지 않았어요!');
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
              <span id='Randomnumbertitle'>행운의 공 뽑기</span>
              <span id='lottonumbertitledescription'>
                1부터 10까지의 숫자 네 자리를 맞추면 자그마한 선물을 받을 수
                있어요!
              </span>
              <div id='lottoform'>
                <h5 id='inputlottonumber'>첫 번째 숫자</h5>
                <h5 id='inputlottonumber'>두 번째 숫자</h5>
                <h5 id='inputlottonumber'>세 번째 숫자</h5>
                <h5 id='inputlottonumber'>네 번째 숫자</h5>

                <input
                  id='lottonum1'
                  type='number'
                  className='form-control'
                  max={10}
                  min={1}
                  value={userChooseNumber.number1}
                  placeholder='?'
                  onChange={(e) =>
                    updateUserChooseNumber({ number1: e.target.value })
                  }
                />
                <input
                  className='form-control'
                  id='lottonum1'
                  type='number'
                  max={10}
                  min={1}
                  value={userChooseNumber.number2}
                  placeholder='?'
                  onChange={(e) =>
                    updateUserChooseNumber({ number2: e.target.value })
                  }
                />
                <input
                  className='form-control'
                  id='lottonum1'
                  type='number'
                  max={10}
                  min={1}
                  placeholder='?'
                  value={userChooseNumber.number3}
                  onChange={(e) =>
                    updateUserChooseNumber({ number3: e.target.value })
                  }
                />
                <input
                  className='form-control'
                  id='lottonum1'
                  type='number'
                  max={10}
                  min={1}
                  placeholder='?'
                  value={userChooseNumber.number4}
                  required={true}
                  onChange={(e) =>
                    updateUserChooseNumber({ number4: e.target.value })
                  }
                />
              </div>
              <button className='btn' id='lottobtn' onClick={handlesubmit}>
                로또 사기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomNumber;