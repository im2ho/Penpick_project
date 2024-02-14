import '../css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PenPickLogo from '../img/펜픽로고.png';
import UserImg from '../img/사용자.png';
import user from '../img/사용자.jpg';
import marker from '../img/마커2.png';

function Header() {
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 창 크기가 변경될 때마다 상태 업데이트
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 작은 화면에서의 동작 정의
  const smallScreenFunction = () => {
    return (
      <div id='MainsmallMenu' className='side-menu'>
        <div id='sidebarGroup'>
          <img src={user} id='MainSideUserImg' alt='사용자'></img>
          <div id='sidebarSign' className='row'>
            <a
              id='HeaderDropDownLink2'
              class='dropdown-item col-md-5'
              href='/login'
            >
              로그인
            </a>
            <span id='sidemenuSignUpCenterBar' className='col-md-2'>
              |
            </span>
            <a
              id='HeaderDropDownLink2'
              class='dropdown-item col-md-5'
              href='/signUp'
            >
              회원가입
            </a>
          </div>
        </div>
        <div id='sidemenuPointBox'>
          <button id='sidemenuPoint'>포인트</button>|
          <button id='sidemenuPoint'>쿠폰</button>
        </div>
        <a
          class='nav-link active'
          aria-current='page'
          id='HeaderQnALink2'
          href='/QnA'
        >
          고객센터<span id='sidemenuArrow'></span>
        </a>
        <a
          class='nav-link active'
          aria-current='page'
          id='HeaderEventLink2'
          href='/EventPage'
        >
          이벤트<span id='sidemenuArrow'></span>
        </a>
        <li class='nav-item'>
          <a
            id='HeaderCartImg2'
            class='nav-link active'
            aria-current='page'
            href='/FreshHome'
          >
            펜픽프레쉬<span id='sidemenuArrow'></span>
          </a>
        </li>
      </div>
    );
  };

  // 큰 화면에서의 동작 정의
  const largeScreenFunction = () => {
    return (
      <div>
        {/* 큰 화면에서의 메뉴 항목들 */}
        <ul id='headerbox' class='navbar-nav me-auto mb-2 mb-lg-0'>
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
              href='/PrevFresh'
            >
              펜픽프레쉬
            </a>
          </li>

          <li class='nav-item dropdown'>
            <a
              class='nav-link'
              href='/'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <img id='HeaderUserImg' src={UserImg} alt='사용자' />
            </a>
            <ul class='dropdown-menu' id='HeaderDropdownBox'>
              {isAuthenticated ? (
                // 로그인 상태에서 보일 카테고리
                <>
                  <li>
                    <a
                      class='dropdown-item'
                      id='HeaderDropDownLinkMYPAGE'
                      href='/mypage'
                    >
                      마이페이지
                    </a>
                  </li>
                  <li>
                    <button
                      class='dropdown-item'
                      id='HeaderDropDownLinkMYPAGE'
                      type='button'
                      onClick={handleLogout}
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                // 로그아웃 상태에서 보일 카테고리
                <>
                  <li>
                    <a
                      id='HeaderDropDownLink'
                      class='dropdown-item'
                      href='/login'
                    >
                      로그인
                    </a>
                  </li>
                  <li>
                    <a
                      id='HeaderDropDownLink'
                      class='dropdown-item'
                      href='/signUp'
                    >
                      회원가입
                    </a>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  // 버튼 클릭 시 동작 정의
  const handleClick = () => {
    // 현재 화면 크기에 따라 다른 동작 수행
    if (windowWidth <= 1000) {
      smallScreenFunction();
    } else {
      largeScreenFunction();
    }
  };

  //로그인 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8282/userdata', {
          withCredentials: true,
        });
        setUserEmail(res.data.userEmail);
        setAuthentication(res.data.userEmail);
      } catch (err) {
        console.error('세션 데이터 불러오기 실패', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const setAuthentication = (userEmail) => {
    if (userEmail !== '') {
      setIsAuthenticated(true);
    }
  };

  // 초기 로딩 중에는 아무것도 반환X
  if (isLoading) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8282/logout', null, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('로그아웃 되셨습니다');
      window.location.href = 'http://localhost:3000/';
    }
  };

  return (
    <div>
      <div id='HeaderBannerImg'>
        <div id='mainPageCenterBox'>
          <nav id='HeaderNav' class='navbar navbar-expand-lg '>
            <div class='container-fluid'>
              <button
                id='smallMenuBar'
                class='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={handleClick}
              >
                <span class='navbar-toggler-icon'></span>
              </button>
              <div class='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
                  {/* 작은 화면에서는 smallScreenFunction 반환, 큰 화면에서는 largeScreenFunction 반환 */}
                  {windowWidth <= 1000
                    ? smallScreenFunction()
                    : largeScreenFunction()}
                </ul>
              </div>
            </div>
          </nav>
          {/* 메인페이지 카테고리 */}
          <div id='HeaderBannerLink'>
            <a href='/' id='HeaderMainLink'>
              <img id='HeaderPenPickImg' src={PenPickLogo} alt='펜픽로고'></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;