import '../css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventImg from '../img/EventImg1.jpg';
import FormImg from '../img/파란집.png';
import React, { useState } from 'react';
import CartImg from '../img/장바구니.png';
import Pagination from 'react-js-pagination';
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Nav,
} from 'react-bootstrap';
import PenPickLogo from '../img/펜픽로고.png';
import Calendar from '../img/달력.png';
import UserImg from '../img/사용자.png';
import SearchButton from '../img/돋보기.png';
import axios from 'axios';

function SearchHeader() {
  // 검색어
  const [searchTerm, setSearchTerm] = useState('');
  // 검색결과
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/penpick/search?name=${searchTerm}`
      );
      console.log(response.data);

      const responseData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setSearchResult(responseData);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResult([]);
    }
  };
  return (
    <div>
      <div id='HeaderBannerImg'>
        <nav id='HeaderNav' class='navbar navbar-expand-lg '>
          <div class='container-fluid'>
            <button
              class='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span class='navbar-toggler-icon'></span>
            </button>
            <div class='' id='navbarSupportedContent'>
              <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                <a
                  class='nav-link active'
                  aria-current='page'
                  id='HeaderQnALink'
                  href='/QnA'
                >
                  고객센터
                </a>
                <a
                  class='nav-link active'
                  aria-current='page'
                  id='HeaderEventLink'
                  href='/EventPage'
                >
                  이벤트
                </a>
                <li class='nav-item'>
                  <a
                    id='HeaderCartImg'
                    class='nav-link active'
                    aria-current='page'
                    href='/CartList'
                  >
                    장바구니
                  </a>
                </li>

                <li class='nav-item dropdown'>
                  <a
                    class='nav-link dropdown-toggle'
                    href='/'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <img id='HeaderUserImg' src={UserImg} alt='사용자' />
                  </a>
                  <ul class='dropdown-menu' id='HeaderDropdownBox'>
                    <li>
                      <a id='HeaderDropDownLink' class='dropdown-item' href='/'>
                        로그인/회원가입
                      </a>
                    </li>
                    <li>
                      <a id='HeaderDropDownLink' class='dropdown-item' href='#'>
                        비회원 예약조회
                      </a>
                    </li>
                    <li>
                      <a
                        class='dropdown-item'
                        id='HeaderDropDownLinkMYPAGE'
                        href='/Mypage'
                      >
                        마이페이지
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* 메인페이지 카테고리 */}
        <div id='HeaderBannerLink'>
          <a href='/' id='HeaderMainLink'>
            <img id='HeaderPenPickImg' src={PenPickLogo} alt='펜픽로고'></img>
          </a>
          <form id='PensionSearchForm'>
            <input
              id='PensionInput'
              type='text'
              placeholder='펜션을 입력하세요'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              id='PensionSearchButton'
              type='submit'
              onClick={handleSearch}
            >
              <img id='PensionSearchImg' src={SearchButton} alt='돋보기' />
            </button>
          </form>
          <ul>
            {searchResult.map((pension) => (
              <li key={pension.id}>
                <p>Name: {pension.name}</p>
                <p>주소</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default SearchHeader;