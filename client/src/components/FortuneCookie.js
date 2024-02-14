import React, { useState } from 'react';
import coinimg from '../img/coin2.png';
import fortuneImg from '../img/포춘쿠키.jpg';
import brokenfortuneImg from '../img/깨진쿠키.png';
import '../css/Game.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

function FortuneCookie() {
  const FortuneCookie = {
    1: '문제가 하나씩 해결이 되면서 만사가 원만하게 풀려 나간다.',
    2: '어려운 시기는 무사히 잘 넘겼으니 현재의 상태를 유지하라.',
    3: '작은 일에 시간을 낭비하지 말고 더욱 큰일에 몰두하라.',
    5: '여행을 하게 되면 고생을 할 수도 있다.',
    6: '취직을 하려는 귀하는 원하는 곳에 취직을 하게 된다.',
    7: '낙천적인 성격에 술을 자주 마시게 된다.',
    8: '풀리지 않던 일도 풀리는 좋은 시기이다.',
    9: '주의사람의 신의를 저버리면 큰 해를 당하는 운이다.',
    10: '경솔한 태도는 좋은 결과를 낳을 수 없다.',
    11: '신의를 두텁게 하며 기다려야 한다.',
    12: '사방이 험한 산들로 막혀있다. 오늘은 매사에 신중해라.',
    13: '심기를 안정시키고 기다리는 것이 상책이라 한다.',
    14: '갖가지 방법을 동원하여 역경을 물리치기는 하나 결실은 만족치 못하다.',
    15: '능력을 십분 발휘해 볼 시기가 왔으니 움직여라.',
    16: '노력한 만큼의 결실은 맺어지겠다.',
    17: '님도 보고 뽕도 따겠으니 잘 풀려 나가리라.',
    18: '사방 어디를 가도 이익이 있으니 자신의 기량을 마음껏 발휘하라.',
    19: '금전상으로 약간의 손실이 있겠으나 걱정할 정도는 아니다.',
    20: '작은 것으로 큰 것을 이루리라.',
    21: '밖으로 나간다면 좋은 친구를 만나리라.',
    22: '모든 일이 순탄하게 이루어진다.',
    23: '늘 감사한다는 마음을 가지고 살아라.',
    24: '직원들에게 너무 야박하게 하면 손해를 보니 주의하라.',
    25: '짝을 찾으려는 적극적인 자세가 필요하다. 늦어지겠다.',
    26: '구설수에 오를 수 있으니 조심하라.',
    27: '일이 여의치 않으니 마음에 번민이 만하다.',
    28: '힘겨운 일들을 잘 극복하여 전화위복의 기회로 삼아라.',
    29: '귀하를 너무 잘해주는 이들을 주의하라.',
    30: '집에 있으면 근심이 많고 밖에 나가면 오히려 마음이 편하다.',
    31: '이성을 가까이 하지 마라.',
    32: '강한 자에게 강하게 나갈 줄 아는 용기가 필요하다.',
    33: '점차적으로 원하던 뜻을 이루게 된다.',
    34: '소극적인 자세로는 꿈을 실현하기 어렵다.',
    35: '부지런히 뛰어다닌 만큼 이득도 나날이 몇 배로 늘어나게 된다.',
    36: '친한 사람을 통해 이성을 만나 오랫동안 연애시절을 보내게 된다.',
    37: '바라던 모든 것이 때를 만난 듯하다.',
    38: '가까운 이들의 도움을 많이 받게 된다.',
    39: '평소에 대인관계를 잘 해두었기에 주변에서 도울 사람들이 많이 나타난다.',
    40: '성공하기 좋은 때이다. 하지만 너무 서둘지 마라.',
    41: '멀리서 찾지 말고 가까운 곳에서 찾아라.',
    42: '날씨는 좋으나 기분이 우울하니 기분전환이 필요하다.',
    43: '좋은 기회를 놓쳤으나 너무 상심하지 말라. 체력관리가 필요한 시기다.',
    44: '사업을 하시는 귀하는 계획을 다시 설계하는 것이 좋겠다.',
    45: '바라고만 있으면 무슨 일을 할 수 있겠는가. 실천에 들어가라.',
    46: '개업이나 전업은 좋지 않다. 취직도 서둘렀어야 했다.',
    47: '말을 함부로 내뱉는 일이 없도록 신중해야겠다.',
    48: '침착하고 냉정한 자세가 필요한 시기이다.',
    49: '평소에 한 푼도 쓰기를 아까워하는 근검한 운영방식이 결국 성공이라는 결실을 맺는다.',
    50: '자산이 늘어나고 가족들도 부귀한 생활을 누리게 된다.',
    51: '시험을 본 귀하는 서적이 만족할 수준은 못되지만 합격은 가능하다.',
    52: '너무 욕심을 부리면 오히려 역효과를 부를 수 있다.',
    53: '적당한 선에서 만족하는 것이 좋다.',
    54: '무리하게 사업을 확장하는 것은 금물 시기가 길하지 않다.',
    55: '육체도 중요하지만 정신적인 건강을 더욱 생각해야 할 시기이다.',
    56: '복잡한 일로 마음이 불편하니 마음을 편히 갖고 안정을 취하라.',
    57: '뜻하던 바가 이루어지질 않아 마음이 편안하지 않다.',
    58: '벌이고 있는 사업이 원활하게 이루어지지 않는다.',
    59: '오랫동안 기원했던 소원도 풀리지 않으니 길이 보이지 않는다.',
    60: '일들이 제대로 손에 잡히질 않고 만사가 꽉 막혀있다.',
    61: '이상형의 상대를 찾아 나서지만 만나기가 쉽지 않다.',
  };

  const [selectedFortune, setSelectedFortune] = useState(null);

  const handleFortuneClick = () => {
    // 포춘쿠키 이미지를 클릭했을 때 실행되는 함수
    const randomIndex =
      Math.floor(Math.random() * Object.keys(FortuneCookie).length) + 1;
    setSelectedFortune(FortuneCookie[randomIndex]);
  };

  return (
    <div>
      <Header />
      <div id='GamelandContainer'>
        <div id='GamelandfortuneContainer'>
          <a href='/GameLand'>
            <span id='gamelandtitle2'>게임랜드</span>
          </a>
          <img src={coinimg} alt='코인' id='coinimg' />
          <div>
            <h6>다양한 미니게임을 통해 점수를 얻어봐요!</h6>
            <h6>행운이 따른다면 자그마한 선물이....?</h6>
          </div>
          <div id='fortuneContainer'>
            <span id='windowpopbutton1'>_</span>
            <span id='windowpopbutton2'>ㅁ</span>
            <a href='GameLand'>
              <span id='windowpopbutton3'>X</span>
            </a>
            <span id='fortunetitle'>오늘의 운세</span>
            <div id='fortunegrid'>
              {selectedFortune && selectedFortune !== null ? (
                <div id='fortuneResultBox'>
                  <img
                    src={brokenfortuneImg}
                    id='brokenfortuneImg'
                    title='하루에 한번만 할 수 있어요!'
                    alt='포춘쿠키'
                  />
                  <p id='fortunecookiement'>{selectedFortune}</p>
                  <a href='GameLand' id='fortunetoGameland'>
                    돌아가기
                  </a>
                </div>
              ) : (
                <div id='fortuneImgBox'>
                  <img
                    src={fortuneImg}
                    id='fortuneImg'
                    alt='포춘쿠키'
                    onClick={handleFortuneClick}
                  />
                  <p id='fortunecookiement'>
                    포춘 쿠키를 흔들어서 <br />
                    깨트려 보세요!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FortuneCookie;