import '../css/PensionMainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PenPickLogo from '../img/PenPickLogo.png';
import EventImg from '../img/EventImg1.jpg';
import FormImg from '../img/파란집.png';
import React, { useState, useEffect } from 'react';
import CartImg from '../img/장바구니.png';
import Header from './Header';
import upImg from '../img/위로이동.png';
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Nav,
} from 'react-bootstrap';
import pensionImg1 from '../img/JS애견풀빌라_2_공공3유형.jpg';
import pensionImg2 from '../img/꽃지화이트펜션_2_공공3유형.jpg';
import pensionImg3 from '../img/이른아침호숫가펜션_3_공공3유형.jpg';
import pensionImg4 from '../img/이른아침호숫가펜션_5_공공3유형.jpg';
import BestLocationImg1 from '../img/가평.jpg';
import BestLocationImg2 from '../img/강릉.jpg';
import BestLocationImg3 from '../img/속초.jpg';
import BestLocationImg4 from '../img/포천.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PensionList from './PensionList';
import Chat from './Chat';
import imgChat from '../img/챗봇.png';
import marker from '../img/마커2.png';
import event1 from '../img/이벤트 썸네일.png';
import event2 from '../img/이벤트 썸네일2.png';
import event3 from '../img/이벤트 썸네일3.png';

function PensionMainPage() {
  // 날짜
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);

  // 다음 날짜 계산
  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayOfMonth = ('0' + nextDay.getDate()).slice(-2);
  const Month = ('0' + (nextDay.getMonth() + 1)).slice(-2);
  const nextYear = nextDay.getFullYear();

  // 한 달 후 날짜 계산
  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const oneMonthLaterYear = oneMonthLater.getFullYear();
  const oneMonthLaterMonth = ('0' + (oneMonthLater.getMonth() + 1)).slice(-2);
  const oneMonthLaterDay = ('0' + oneMonthLater.getDate()).slice(-2);

  // 검색어
  const [searchTerm, setSearchTerm] = useState({
    term: '',
    checkindate: year + '-' + month + '-' + day,
    checkoutdate: nextYear + '-' + Month + '-' + nextDayOfMonth,
    peopleNumber: '2',
  });
  // 검색 후 페이지 이동
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('/PensionList', {
      state: {
        searchTerm,
      },
    });
  };

  //지역 이름 넘기는 함수
  const selectRegionAndNavigate = (region) => {
    const selectedRegion = region;
    window.location.href = `/PensionList?region=${selectedRegion}`;
  };

  const onPopup = () => {
    const url = 'Chat';
    window.open(url, '_blank', 'width=750px,height=890px');
  };

  const Up = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div id='mainpageContainer'>
      <Header />

      <div id='BannerImg1'>
        {/* 메인 문구 */}
        <div id='MainTitleBox'>
          <h1 id='MainTitle' class='fade-in-element'>
            <span id='firstmt'>
              <span id='mt1'> 예약부터</span> <span id='mt2'>픽업까지</span>
            </span>
            <br />
            <span id='mt3'>펜픽으로</span> <span id='mt4'>모두해결</span>
            <span>
              <img id='maintitlemarker' src={marker} alt='마커'></img>
            </span>
          </h1>
        </div>

        {/* 펜션 검색창 감싼 박스 */}
        <div id='SearchForm'>
          <div id='form_Img_Title'>
            <img id='formImg' src={FormImg} alt='파란집' />
            <span id='formTitle'>펜션</span>
          </div>
          {/* 펜션 검색창 */}
          <form className='row'>
            <div id='SearchFormBar'></div>
            {/* 지역입력칸 */}
            <input
              type='text'
              id='input1'
              className='form-control col-md-3'
              placeholder='펜션을 입력하세요'
              value={searchTerm.term}
              onChange={(e) =>
                setSearchTerm((prevState) => ({
                  ...prevState,
                  term: e.target.value,
                }))
              }
            />
            {/* 체크인날짜 검색창 */}
            <input
              id='input3'
              className='form-control col-md-3'
              type='date'
              placeholder='날짜'
              value={searchTerm.checkindate}
              min={year + '-' + month + '-' + day}
              max={oneMonthLaterYear + '-' + oneMonthLaterMonth + '-' + day}
              onChange={(e) =>
                setSearchTerm((prevState) => ({
                  ...prevState,
                  checkindate: e.target.value,
                }))
              }
            />
            {/* 체크아웃날짜 검색창 */}
            <input
              id='input3'
              className='form-control col-md-3'
              type='date'
              placeholder='날짜'
              value={searchTerm.checkoutdate}
              min={searchTerm.checkindate}
              max={
                oneMonthLaterYear +
                '-' +
                oneMonthLaterMonth +
                '-' +
                nextDayOfMonth
              }
              onChange={(e) =>
                setSearchTerm((prevState) => ({
                  ...prevState,
                  checkoutdate: e.target.value,
                }))
              }
            />
            {/* 인원입력칸 */}
            <input
              min={1}
              max={6}
              id='input2'
              className='form-control col-md-3'
              placeholder='인원'
              type='number'
              value={searchTerm.peopleNumber}
              onChange={(e) =>
                setSearchTerm((prevState) => ({
                  ...prevState,
                  peopleNumber: e.target.value,
                }))
              }
            />
            {/* 펜션 검색버튼 */}
            <button
              id='MainsearchButton'
              className='btn col-md-3'
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              search
            </button>
          </form>
        </div>
      </div>
      <div id='mainContainer'>
        <img id='ChatImg' onClick={onPopup} src={imgChat} alt='챗봇이미지' />
        <img id='Upimg' onClick={Up} src={upImg} alt='위로이동' />

        {/* 이벤트 배너 */}
        <div id='Event'>
          <h5 id='EventTitle'>이벤트</h5>
          <div id='EventImgBox'>
            <a id='EventLink' href='/EventDetail?content=이벤트1'>
              <img id='EventImg' src={event1} alt='이벤트이미지' />
            </a>
            <a id='EventLink' href='/EventDetail?content=이벤트2'>
              <img id='EventImg' src={event2} alt='이벤트이미지' />
            </a>
            <a id='EventLink' href='/EventDetail?content=이벤트3'>
              <img id='EventImg' src={event3} alt='이벤트이미지' />
            </a>
          </div>
        </div>

        <div id='PopularPensionList'>
          <span id='PopularPensionTitle'>인기펜션 </span>
          <span id='description'>최근 한달 간 이용내역 기준</span>
          <br />
          <div id='LinkImgBox' className='row'>
            <div className='col-md-3' id='popularPensionGroup'>
              <a
                href='http://localhost:3000/PensionList?region=청포대하와이펜션'
                alt='인기펜션'
              >
                <img id='pensionImg' src={pensionImg1} alt='pensionImg'></img>
                <h5 id='MainPopularLocationName'>청포대 하와이 펜션</h5>
              </a>
            </div>
            <div className='col-md-3' id='popularPensionGroup'>
              <a
                href='http://localhost:3000/PensionList?region=아침의 소리'
                alt='인기펜션'
              >
                <img id='pensionImg' src={pensionImg2} alt='pensionImg'></img>
                <h5 id='MainPopularLocationName'>아침의 소리</h5>
              </a>
            </div>
            <div className='col-md-3' id='popularPensionGroup'>
              <a
                href='http://localhost:3000/PensionList?region=해뜨는집 펜션'
                alt='인기펜션'
              >
                <img id='pensionImg' src={pensionImg3} alt='pensionImg'></img>
                <h5 id='MainPopularLocationName'>해뜨는집 펜션</h5>
              </a>
            </div>
            <div className='col-md-3' id='popularPensionGroup'>
              <a
                href='http://localhost:3000/PensionList?region=바닷가하얀집'
                alt='인기펜션'
              >
                <img id='pensionImg' src={pensionImg4} alt='pensionImg'></img>
                <h5 id='MainPopularLocationName'>바닷가 하얀집</h5>
              </a>
            </div>
          </div>
        </div>

        <div id='PopularLocation'>
          <span id='PopularLocationTitle'>인기지역 </span>
          <span id='description'>최근 한달 간 이용내역 기준</span>
          <br />
          <div id='LinkImgBox'>
            <button
              id='MainPopularLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('가평')}
            >
              <img
                id='pensionImg'
                src={BestLocationImg1}
                alt='pensionImg'
              ></img>
              <h5 id='MainPopularLocationName'>가평</h5>
            </button>
            <button
              id='MainPopularLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('포천')}
            >
              <img
                id='pensionImg'
                src={BestLocationImg4}
                alt='pensionImg'
              ></img>
              <h5 id='MainPopularLocationName'>포천</h5>
            </button>
            <button
              id='MainPopularLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('속초')}
            >
              <img
                id='pensionImg'
                src={BestLocationImg3}
                alt='pensionImg'
              ></img>
              <h5 id='MainPopularLocationName'>속초</h5>
            </button>
            <button
              id='MainPopularLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('강릉')}
            >
              <img
                id='pensionImg'
                src={BestLocationImg2}
                alt='pensionImg'
              ></img>
              <h5 id='MainPopularLocationName'>강릉</h5>
            </button>
          </div>
        </div>

        <div id='LocationList'>
          <div id='BigLocationList'>
            <span id='PopularLocationTitle'> 전체지역 </span>
            <span id='BigLocationListdescription'>
              오늘은 어느 곳으로 떠나볼까요?
            </span>
          </div>
          <div id='MainLocationLinkBox' className='row'>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('경기')}
            >
              경기도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('인천')}
            >
              인천광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('강원')}
            >
              강원특별자치도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('충청북도')}
            >
              충청북도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('충청북도')}
            >
              충청북도
            </button>
          </div>
          <div id='MainLocationLinkBox' className='row'>
            <button
              id='MainLocationButton'
              className='col-md-3'
              onClick={() => selectRegionAndNavigate('대전')}
            >
              대전광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-3'
              onClick={() => selectRegionAndNavigate('전라북도')}
            >
              전라북도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-3'
              onClick={() => selectRegionAndNavigate('전라남도')}
            >
              전라남도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-3'
              onClick={() => selectRegionAndNavigate('광주광역시')}
            >
              광주광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-3'
              onClick={() => selectRegionAndNavigate('경상북도')}
            >
              경상북도
            </button>
          </div>
          <div id='MainLocationLinkBox' className='row'>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('경상남도')}
            >
              경상남도
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('대구광역시')}
            >
              대구광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('울산광역시')}
            >
              울산광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('부산광역시')}
            >
              부산광역시
            </button>
            <button
              id='MainLocationButton'
              className='col-md-2'
              onClick={() => selectRegionAndNavigate('제주특별자치도')}
            >
              제주특별자치도
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PensionMainPage;