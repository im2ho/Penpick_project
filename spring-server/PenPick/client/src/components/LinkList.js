import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import SignUp from "./SignUp";
import MyPage from "./MyPage";
import PensionMainPage from "./PensionMainPage";
import PensionList from "./PensionList";
import EmptyPage from "./EmptyPage";
import EventPage from "./EventPage";
import DetailsPage from "./DetailsPage";
import PensionMap from "./PensionMap";
import Chat from "./Chat";
import Reservation from "./Reservation";
import EventDetail from "./EventDetail";
import Footer from "./Footer";
import GameLand from "./GameLand";
import RandomballGame from "./RandomballGame";
import RandomNumber from "./Randomnumber";
import ReservationCheck from "./ReservationCheck";
import Review from "./Review";
import FreshHome from "./FreshHome";
import FinishOrder from "./FinishOrder";
import PrevFresh from "./PrevFresh";
import FreshTossCheckout from "./FreshTossCheckout";
import FreshTossSuccess from "./FreshTossSuccess";
import FreshTossFail from "./FreshTossFail";
import ReservationCheckout from "./ReservationCheckout";
import Roulette from "./Roulette";
import QnA from "./QnAList";
import WriteQuestion from "./WriteQusetion";
import QuestionDetail from "./QuestionDetail";
import FortuneCookie from './FortuneCookie';
import ResetPassword from './ResetPassword';
import ReservationCheckDetail from "./ReservationCheckDetail";

function Link() {
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUserEmail(res.data.userEmail);
        setAuthentication(res.data.userEmail);
      } catch (err) {
        console.error("세션 데이터 불러오기 실패", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const setAuthentication = (userEmail) => {
    if (userEmail !== "") {
      setIsAuthenticated(true);
    }
  };

  // 초기 로딩 중에는 아무것도 반환X
  if (isLoading) {
    return null;
  }

  return (
    <Router>
      <Routes>
        {/*로그아웃 상태에서만 유효한 경로*/}
        {!isAuthenticated && (
          <>
            {/* 로그인 및 회원가입 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/rest-password" element={<ResetPassword />}/>
          </>
        )}
        {/*로그인 상태에서만 유효한 경로 */}
        {isAuthenticated && (
          <>
            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />} />
          </>
        )}
        {/* 로그인 여부 상관 없이 이용 가능한 페이지 */}
        {/*메인페이지 링크*/}
        <Route path="/" element={<PensionMainPage />} />
        {/*펜션 검색 결과 링크*/}
        <Route path="/PensionList" element={<PensionList />} />
        {/*이벤트 링크*/}
        <Route path="/EventPage" element={<EventPage />} />
        {/*펜션 상세 페이지 링크*/}
        <Route path="/DetailsPage" element={<DetailsPage />} />
        {/* 지도 링크 */}
        <Route path="/PesionMap" element={<PensionMap />} />
        {/* 채팅하기 */}
        <Route path="/Chat" element={<Chat />} />
        {/*예약페이지 링크*/}
        <Route path="/Reservation" element={<Reservation />}></Route>
        {/* 이벤트 상세 페이지 */}
        <Route path="/EventDetail" element={<EventDetail />}></Route>
        {/* 게임랜드 */}
        <Route path="/GameLand" element={<GameLand />} />
        {/* 로또공뽑기 */}
        <Route path="/RandomballGame" element={<RandomballGame />} />
        {/* 로또 번호 고르기 */}
        <Route path="/Randomnumber" element={<RandomNumber />} />
        {/* 룰렛 돌리기 */}
        <Route path="/Roulette" element={<Roulette />} />
        {/* 마이페이지 예약내역 */}
        <Route path="/ReservationCheck" element={<ReservationCheck />} />
        {/* 리뷰 작성 페이지 */}
        <Route path="/Review" element={<Review />} />
        {/* 프레쉬 예약 선택 홈페이지 */}
        <Route path="/PrevFresh" element={<PrevFresh />} />
        {/* 프레쉬 예약 선택 홈페이지 */}
        <Route path="/FreshHome" element={<FreshHome />} />
        {/* 결제 내역 페이지 */}
        <Route path="/FinishOrder" element={<FinishOrder />} />
        {/*프레쉬-토스페이*/}
        <Route path="/sandbox" element={<FreshTossCheckout />}></Route>
        <Route path="/sandbox/success" element={<FreshTossSuccess />}></Route>
        <Route path="/sandbox/fail" element={<FreshTossFail />}></Route>
        {/* 예약 성공 페이지  */}
        <Route path="reservation/sandbox" element={<ReservationCheckout />}></Route>
        {/* 예약 상세 보기 */}
        <Route path="reservationCheckDetail" element={<ReservationCheckDetail/>}></Route>
        {/* 고객센터 페이지 */}
        <Route path="/QnA" element={<QnA />} />
        {/* 문의글 작성 페이지 */}
        <Route path="/writeQuestion" element={<WriteQuestion />} />
        {/* 문의글 상세 페이지 */}
        <Route
          path="/questionDetail/:questionId"
          element={<QuestionDetail />}
        />
        {/* 지정되지 않은 경로로 접근시 보일 페이지 */}
        <Route path="*" element={<EmptyPage />}/>
        {/* 게임랜드 */}
        <Route path='/FortuneCookie' element={<FortuneCookie />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default Link;
