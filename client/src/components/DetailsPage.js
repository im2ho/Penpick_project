import React, { useState, useEffect } from "react";
import healingPension from "../img/THE 힐링펜션_2_공공3유형.jpg";
import mapOption from "../img/최대화 옵션 이미지.png";
import "../css/DetailsPage.css";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import DetailServiceModal from "./DetailPageModal/DetailServiceModal";
import DetailTripleRoomModal from "./DetailPageModal/DetailTripleRoomModal";
import DetailFamilyRoomModal from "./DetailPageModal/DetailFamilyRoomModal";
import DetailGroupRoomModal from "./DetailPageModal/DetailGroupRoomModal";
import DetailDoubleRoomModal from "./DetailPageModal/DetailDoubleRoomModal";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

function DetailsPage() {
  // 로그인 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // 이미지 저장 배열
  const [images, setImages] = useState([]);

  // 카카오 지도 모달
  const [mapModalBtn, setmapModalBtn] = useState(false);

  const handleMapPensionShow = () => setmapModalBtn(true);

  const handleMapPensionClose = () => setmapModalBtn(false);

  // 이미지 보여주는 모달
  const [ModalButton, setModalButton] = useState(false);

  const handleShow = () => setModalButton(true);

  const handleClose = () => setModalButton(false);

  // 룸 타입
  const [doubleRoom] = useState("더블 룸");

  const [tripleRoom] = useState("트리플 룸");

  const [famillyRoom] = useState("패밀리 룸");

  const [groupRoom] = useState("그룹 룸");

  // 룸 가격
  const [doubleRoomPrice] = useState(80000);

  const [tripleRoomPrice] = useState(120000);

  const [famillyRoomPrice] = useState(160000);

  const [groupRoomPrice] = useState(240000);

  // 비교용 빈배열
  const [resCheck, setResCheck] = useState([]);

  // 예약 날짜 데이터 넣기

  const [resCheckInDate, setResCheckInDate] = useState([]);
  const [resCheckOutDate, setResCheckOutDate] = useState([]);

  // 예약 날짜 체크
  const [reservation, setReservation] = useState(false);

  // pension 정보 들어있는 Hook
  const [detailPension, setDetailPension] = useState([]);

  // const location = useLocation();

  const [searchDetail, setSearchDetail] = useState("");
  // URLSearchParams : 주소창의 경로를 다룰 수 있는 [브라우저의 내장 객체] ( 모던 브라우저에서만 작동 ex.chrome)

  const location = useLocation();
  const navigate = useNavigate();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 날짜
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);

  // 다음 날짜 계산
  const nextDay = new Date(now);
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayOfMonth = ("0" + nextDay.getDate()).slice(-2);
  const Month = ("0" + (nextDay.getMonth() + 1)).slice(-2);
  const nextYear = nextDay.getFullYear();

  // 한 달 후 날짜 계산
  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const oneMonthLaterYear = oneMonthLater.getFullYear();
  const oneMonthLaterMonth = ("0" + (oneMonthLater.getMonth() + 1)).slice(-2);
  const oneMonthLaterDay = ("0" + oneMonthLater.getDate()).slice(-2);

  //체크인 날짜 받기
  const [inputcheckinDate, setInputcheckinDate] = useState(
    location.state?.inputcheckinDate
  );

  //체크아웃 날짜 받기
  const [inputcheckoutDate, setInputcheckoutDate] = useState(
    location.state?.inputcheckoutDate
  );

  // 인원수
  const [peopleNumber, setPeopleNumber] = useState(
    location.state?.peopleNumber
  );

  // 펜션 id
  const selectedId = location.state?.selectedId;

  const pensionName = location.state?.pensionName;

  console.log(
    inputcheckinDate,
    inputcheckoutDate,
    peopleNumber,
    selectedId,
    pensionName
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleReservation = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8282/reservation/getReservation",
        {
          withCredentials: true,
          params: {
            pensions: selectedId,
            checkInDay: inputcheckinDate,
            checkOutDay: inputcheckoutDate,
          },
        }
      );

      // const resData = Array.isArray(res.data) ? res.data : [res.data];
      // console.log(resData);
      const forData = () => {
        for (let i = 0; i <= Object.entries(res.data).length; i++) {
          if (
            res.data[i] !== null &&
            res.data[i] !== resCheck &&
            res.data[i] !== undefined
          ) {
            console.log("false 실행중2");
            return setReservation(false);
          } else {
            console.log("true 실행");
          }
          return setReservation(true);
        }
      };
      forData();
      console.log("for문 끄읏");
      console.log(Object.entries(res.data).length);
      console.log(res.data);
      // console.log("1111" + res.data.checkInDay);
      // console.log("2222" + res.data[0]);
      // for (var item of reservation) {
      //   const reservationCheckInDay = item.checkInDay;
      //   console.log("11111" + reservationCheckInDay);
      // }
    } catch (err) {
      console.log("에러입니다" + err);
    }
  };

  useEffect(() => {
    fetchUserData();

    setSearchDetail(selectedId);
    if (selectedId !== null) {
      handleDetail();
      handleReservation();

      console.log(selectedId);
    } else {
      console.log("검색값 없음");
    }
    console.log("22" + reservation.pay);
  }, [searchDetail]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8282/userdata", {
        withCredentials: true,
      });
      setAuthentication(res.data.userEmail);
      console.log(res.data.userEmail);
    } catch (err) {
      console.error("세션 데이터 불러오기 실패", err);
    } finally {
      // setIsLoading(false);
      console.log("finally");
    }
  };

  //  로그인 체크
  const setAuthentication = (userEmail) => {
    if (userEmail !== "") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleReservationPage = (id, room, price) => {
    // 펜션 id
    const selectedId = id;

    // 룸 타입
    const roomType = room;

    // 룸 가격
    const roomPrice = price;

    console.log(id, room, price);
    navigate("/Reservation", {
      state: {
        inputcheckinDate,
        inputcheckoutDate,
        peopleNumber,
        selectedId,
        roomType,
        roomPrice,
      },
    });
  };

  const handleFalseAlert = (isAuthenticated, reservation) => {
    if (isAuthenticated !== true) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    } else if (
      inputcheckinDate === undefined ||
      inputcheckoutDate === undefined ||
      peopleNumber === undefined
    ) {
      alert("날짜 또는 인원수를 입력하지 않으셨습니다.");
    } else if (reservation !== true) {
      alert("선택하신 날짜에 이미 예약이 있습니다.");
    } else {
      alert("인원수에 맞는 객실을 선택해주세요.");
    }
  };

  const handleDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8282/penpick/details`, {
        withCredentials: true,
        params: {
          id: searchDetail,
        },
      });
      console.log(res.data);
      setDetailPension(res.data);
      loadKakaoMap(res.data);
      console.log(detailPension);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    loadKakaoMap(detailPension);
    if (detailPension !== null) {
      fetchImages();
    }
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8282/details?name=${encodeURIComponent(pensionName)}`,
        {
          withCredentials: true,
        }
      );
      if (!response.ok) {
        throw new Error("네트워크 연결되지 않습니다.");
      }

      const imagesData = await response.json();
      setImages(imagesData);
      console.log("아");
      console.log(pensionName);
      console.log(imagesData);
    } catch (error) {
      console.error("이미지 에러.:", error);
    }
  };

  const loadKakaoMap = (pension) => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=bc0b0a476c690ff9dfdbc6a531ebf7b4&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        // 이 안에서는 window.kakao.maps가 올바로 로드된 상태입니다.
        const container = document.getElementById("map");
        // console.log("1");
        const container2 = document.getElementById("map2");
        // console.log("2");

        const options = {
          center: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          level: 3,
        };
        // console.log("4");
        const options2 = {
          center: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        // console.log("5");
        const map2 = new window.kakao.maps.Map(container2, options2);
        // console.log("6");

        var mapTypeControl = new window.kakao.maps.MapTypeControl();
        // console.log("8");

        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );
        // console.log("9");
        map2.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );
        // console.log("10");

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          title: pension.name,
        });
        // console.log("12");
        const marker2 = new window.kakao.maps.Marker({
          map: map2,
          position: new window.kakao.maps.LatLng(
            pension.latitude,
            pension.longitude
          ),
          title: pension.name,
        });
        // console.log("13");
        var content = `<div class="wrap">
              <div class="info">
                  <div class="title" > 
          ${detailPension.name}
                      <div class="close" onclick="closeOverlay()" title="닫기"></div>
                  </div>
                 <div class="body">
                      <div class="img">
                          <img src=${healingPension} width="73" height="70">
                     </div>
                      <div class="desc">
                          <div class="ellipsis">${detailPension.address}</div>
                      </div>
                  </div>
              </div>
          </div>`;

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다

        var overlay2 = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map2,
          position: marker.getPosition(),
        });

        let markerOpen = false;
        let markerOpen2 = false;
        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다

        window.kakao.maps.event.addListener(marker2, "click", function () {
          if (markerOpen2) {
            overlay2.setMap(null);
            markerOpen2 = false;
          } else {
            overlay2.setMap(map2);
            markerOpen2 = true;
          }
        });

        if (mapModalBtn === true) {
          const container3 = document.getElementById("map3");
          console.log("container3");
          const options3 = {
            center: new window.kakao.maps.LatLng(
              pension.latitude,
              pension.longitude
            ),
            level: 3,
          };
          console.log("options3");
          const map3 = new window.kakao.maps.Map(container3, options3);
          console.log("map3");
          var mapTypeControl = new window.kakao.maps.MapTypeControl();
          map3.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );
          console.log("map3.addControl");
          const marker3 = new window.kakao.maps.Marker({
            map: map3,
            position: new window.kakao.maps.LatLng(
              pension.latitude,
              pension.longitude
            ),
            title: pension.name,
          });
          console.log("marker3");
          var overlay3 = new window.kakao.maps.CustomOverlay({
            content: content,
            map: map3,
            position: marker.getPosition(),
          });

          let markerOpen3 = false;
          window.kakao.maps.event.addListener(marker3, "click", function () {
            if (markerOpen3) {
              overlay3.setMap(null);
              markerOpen3 = false;
            } else {
              overlay3.setMap(map3);
              markerOpen3 = true;
            }
          });
        }
      });
    };
  };

  return (
    <div>
      <Header />

      <div id="detailpage">
        <div>
          <div id="detailpage-sub">
            <section id="detail-img-section">
              <div>
                <a id="detail-img-container">
                  <div id="detail-main-img-grid">
                    {images.length > 0 && images[0].imageData && (
                      <img
                        id="detail-main-img1"
                        src={`data:image/jpeg;base64,${images[0].imageData}`}
                        alt={images[0].imageName}
                        onClick={handleShow}
                      />
                    )}
                  </div>
                  <div id="detail-sub-img-grid">
                    {images.length > 0 && images[1].imageData && (
                      <img
                        id="detail-sub-img2"
                        src={`data:image/jpeg;base64,${images[1].imageData}`}
                        alt={images[1].imageName}
                        onClick={handleShow}
                      />
                    )}
                  </div>
                  <div id="detail-sub-img-grid">
                    {images.length > 0 && images[2].imageData && (
                      <img
                        id="detail-sub-img3"
                        src={`data:image/jpeg;base64,${images[2].imageData}`}
                        alt={images[2].imageName}
                        onClick={handleShow}
                      />
                    )}
                  </div>
                  <div id="detail-sub-img-grid">
                    {images.length > 0 && images[3].imageData && (
                      <img
                        id="detail-sub-img4"
                        src={`data:image/jpeg;base64,${images[3].imageData}`}
                        alt={images[3].imageName}
                        onClick={handleShow}
                      />
                    )}
                  </div>
                  <div id="detail-sub-img-grid">
                    {images.length > 0 && images[4].imageData && (
                      <img
                        id="detail-sub-img5"
                        src={`data:image/jpeg;base64,${images[4].imageData}`}
                        alt={images[4].imageName}
                        onClick={handleShow}
                      />
                    )}

                    <div id="modal-btn">
                      <Button
                        className="btn"
                        style={{
                          background: "white",
                          border: "none",
                          borderRadius: "30px",
                          color: "black",
                          boxShadow: "0px 0px 5px black",
                          fontSize: "12px",
                          fontWeight: "600",
                          padding: "12px 20px 12px 20px",
                        }}
                        onClick={handleShow}
                      >
                        사진 모두보기
                      </Button>
                      <Modal
                        id="modalpage"
                        show={ModalButton}
                        onHide={handleClose}
                      >
                        <Modal.Header id="modal-header-title" closeButton>
                          <Modal.Title id="modal-header-title">
                            {detailPension.name}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal-body-img">
                          <div id="modal-body-div">
                            {images.length > 0 && images[0].imageData && (
                              <img
                                id="modal-main-img"
                                src={`data:image/jpeg;base64,${images[0].imageData}`}
                                alt={images[0].imageName}
                              />
                            )}
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          {images.map(
                            (image, index) =>
                              image &&
                              image.imageData && (
                                <img
                                  key={index}
                                  id="detail-img-map"
                                  src={`data:image/jpeg;base64,${image.imageData}`}
                                  alt={image.imageName}
                                />
                              )
                          )}
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          </div>
          <section id="pension-service-section">
            <div id="pension-div-box">
              <div id="detail-title">
                <p id="detail-title-text">펜션</p>
                <h3 id="detail-title-name">{detailPension.name}</h3>
              </div>
              <div id="detail-PensionSearchForm">
                <input
                  id="detail-HeaderPensionInputDate1"
                  value={inputcheckinDate}
                  min={inputcheckinDate}
                  max={oneMonthLaterYear + "-" + oneMonthLaterMonth + "-" + day}
                  type="date"
                  onChange={(e) => setInputcheckinDate(e.target.value)}
                />
                <span id="detail-InputBar">|</span>
                <input
                  id="detail-HeaderPensionInputDate2"
                  min={inputcheckinDate}
                  value={inputcheckoutDate}
                  max={
                    oneMonthLaterYear +
                    "-" +
                    oneMonthLaterMonth +
                    "-" +
                    nextDayOfMonth
                  }
                  type="date"
                  onChange={(e) => setInputcheckoutDate(e.target.value)}
                />
                <span id="detail-InputBar">ㅣ</span>
                <input
                  id="detail-HeaderPensionInputNumber"
                  value={peopleNumber}
                  type="number"
                  onChange={(e) => setPeopleNumber(e.target.value)}
                  min={1}
                  max={8}
                />
                명
              </div>

              <div id="detail-service-container">
                <div id="detail-lines" />
                <div id="detail-lines-title">
                  서비스 및 부대시설
                  <span>
                    <DetailServiceModal />
                  </span>
                </div>
                <div id="detail-linse-text">
                  Parking : {detailPension.parking}
                  <br />
                  Cook : {detailPension.cook}
                  <br />
                  Dining Hall : {detailPension.dininghall}
                  <br />
                  Amenities : {detailPension.amenities}
                </div>
                <div id="detail-lines" />
                <div id="detail-lines-title">객실 선택</div>
                <div id="detail-room-container">
                  <div id="detail-room-sub-container">
                    <div id="detail-room-imgbox">
                      <img
                        id="detail-room-img"
                        src={healingPension}
                        alt="펜션이미지"
                      />
                      <h5 id="detail-room-name">더블 룸</h5>
                      <div>
                        <DetailDoubleRoomModal />
                        <br />
                        <div id="detail-room-checkIObox">
                          <div>
                            <div id="room-check-in">
                              입실 {detailPension.check_in}
                              <br />
                              퇴실 {detailPension.check_out}
                            </div>
                            <div id="room-reservation-text">
                              <div id="room-reservation-price">80,000원</div>

                              <div>
                                {peopleNumber >= 2 &&
                                peopleNumber <= 3 &&
                                isAuthenticated !== false &&
                                reservation !== false ? (
                                  <Button
                                    class="btn btn-primary"
                                    id="reservation-btn"
                                    onClick={() =>
                                      handleReservationPage(
                                        searchDetail,
                                        doubleRoom,
                                        doubleRoomPrice
                                      )
                                    }
                                  >
                                    객실 예약
                                  </Button>
                                ) : (
                                  <Button
                                    class="btn btn-danger"
                                    id="reservation-btn-false"
                                    onClick={() =>
                                      handleFalseAlert(
                                        isAuthenticated,
                                        reservation
                                      )
                                    }
                                  >
                                    예약 불가
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="detail-room-people">
                          <span id="detail-room-people-title">
                            객실정보{" "}
                            <span id="detail-room-people-text">
                              기준2인 · 최대3인 (유료){" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="detail-room-container">
                  <div id="detail-room-sub-container">
                    <div id="detail-room-imgbox">
                      <img
                        id="detail-room-img"
                        src={healingPension}
                        alt="펜션이미지"
                      />
                      <h5 id="detail-room-name">트리플 룸</h5>
                      <div>
                        <DetailTripleRoomModal />
                        <br />
                        <div id="detail-room-checkIObox">
                          <div>
                            <div id="room-check-in">
                              입실 {detailPension.check_in}
                              <br />
                              퇴실 {detailPension.check_out}
                            </div>
                            <div id="room-reservation-text">
                              <div id="room-reservation-price">120,000원</div>

                              <div>
                                {peopleNumber >= 3 &&
                                peopleNumber <= 4 &&
                                isAuthenticated !== false &&
                                reservation !== false ? (
                                  <Button
                                    class="btn btn-primary"
                                    id="reservation-btn"
                                    onClick={() =>
                                      handleReservationPage(
                                        searchDetail,
                                        tripleRoom,
                                        tripleRoomPrice
                                      )
                                    }
                                  >
                                    객실 예약
                                  </Button>
                                ) : (
                                  <Button
                                    class="btn btn-danger"
                                    id="reservation-btn-false"
                                    onClick={() =>
                                      handleFalseAlert(
                                        isAuthenticated,
                                        reservation
                                      )
                                    }
                                  >
                                    예약 불가
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="detail-room-people">
                          <span id="detail-room-people-title">
                            객실정보{" "}
                            <span id="detail-room-people-text">
                              기준3인 · 최대4인 (유료){" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="detail-room-container">
                  <div id="detail-room-sub-container">
                    <div id="detail-room-imgbox">
                      <img
                        id="detail-room-img"
                        src={healingPension}
                        alt="펜션이미지"
                      />
                      <h5 id="detail-room-name">패밀리 룸</h5>
                      <div>
                        <DetailFamilyRoomModal />
                        <br />
                        <div id="detail-room-checkIObox">
                          <div>
                            <div id="room-check-in">
                              입실 {detailPension.check_in}
                              <br />
                              퇴실 {detailPension.check_out}
                            </div>
                            <div id="room-reservation-text">
                              <div id="room-reservation-price">160,000원</div>

                              <div>
                                {peopleNumber >= 4 &&
                                peopleNumber <= 5 &&
                                isAuthenticated !== false &&
                                reservation !== false ? (
                                  <Button
                                    class="btn btn-primary"
                                    id="reservation-btn"
                                    onClick={() =>
                                      handleReservationPage(
                                        searchDetail,
                                        famillyRoom,
                                        famillyRoomPrice
                                      )
                                    }
                                  >
                                    객실 예약
                                  </Button>
                                ) : (
                                  <Button
                                    class="btn btn-danger"
                                    id="reservation-btn-false"
                                    onClick={() =>
                                      handleFalseAlert(
                                        isAuthenticated,
                                        reservation
                                      )
                                    }
                                  >
                                    예약 불가
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="detail-room-people">
                          <span id="detail-room-people-title">
                            객실정보{" "}
                            <span id="detail-room-people-text">
                              기준4인 · 최대5인 (유료){" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="detail-room-container">
                  <div id="detail-room-sub-container">
                    <div id="detail-room-imgbox">
                      <img
                        id="detail-room-img"
                        src={healingPension}
                        alt="펜션이미지"
                      />
                      <h5 id="detail-room-name">그룹 룸</h5>
                      <div>
                        <DetailGroupRoomModal />
                        <br />
                        <div id="detail-room-checkIObox">
                          <div>
                            <div id="room-check-in">
                              입실 {detailPension.check_in}
                              <br />
                              퇴실 {detailPension.check_out}
                            </div>
                            <div id="room-reservation-text">
                              <div id="room-reservation-price">240,000원</div>

                              <div>
                                {peopleNumber >= 5 &&
                                peopleNumber <= 8 &&
                                isAuthenticated !== false &&
                                reservation !== false ? (
                                  <Button
                                    class="btn btn-primary"
                                    id="reservation-btn"
                                    onClick={() =>
                                      handleReservationPage(
                                        searchDetail,
                                        groupRoom,
                                        groupRoomPrice
                                      )
                                    }
                                  >
                                    객실 예약
                                  </Button>
                                ) : (
                                  <Button
                                    class="btn btn-danger"
                                    id="reservation-btn-false"
                                    onClick={() =>
                                      handleFalseAlert(
                                        isAuthenticated,
                                        reservation
                                      )
                                    }
                                  >
                                    예약 불가
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="detail-room-people">
                          <span id="detail-room-people-title">
                            객실정보{" "}
                            <span id="detail-room-people-text">
                              기준5인 · 최대8인 (유료){" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="detail-lines" />
                <div id="detail-lines-title">숙소 소개</div>
                <div id="detail-lines-text">{detailPension.introduction}</div>
                <div id="detail-lines" />
                <div id="detail-lines-title">숙소 이용 정보</div>
                <div id="detail-linse-head-text">
                  기본정보
                  {/* 기본적으로 NULL 일시 비우는 조건 필요 */}
                  <div>
                    <li id="detail-li-text">
                      입실 : {detailPension.check_in} | 퇴실 :
                      {detailPension.check_out}
                    </li>
                    <li id="detail-li-text">
                      주차 여부 : {detailPension.parking}
                    </li>
                    <li id="detail-li-text">
                      {" "}
                      조리 여부 : {detailPension.cook}
                    </li>
                    {/* COOK 컬럼은 NULL 이나 불가 일시 비우는 조건 필요 */}
                    <li id="detail-li-text">
                      Dining Hall : {detailPension.dininghall}
                    </li>
                    <li id="detail-li-text">
                      Amenities : {detailPension.amenities}
                    </li>
                    {/* 
                      DB 에 저장돼있는 데이터에서 
                      DINING HALL 에 바베큐장이 있으면 
                      AMENITIES 컬럼에 바베큐장이 없음
                      고로 둘다 넣어도 중복되지 않음
                  */}
                  </div>
                </div>
                <div id="detail-linse-head-text">
                  객실 정보
                  <div>
                    <li id="detail-li-text-caution">{detailPension.scale}</li>
                    <li id="detail-li-text">
                      객실 종류 : 더블, 트리플, 패밀리, 그룹
                    </li>
                  </div>
                </div>
                <div id="detail-linse-head-text">
                  인원 추가 정보
                  <div>
                    <li id="detail-li-text">
                      1인 20,000원 (24개월 이상~13세 미만), 40,000원 (13세 이상)
                    </li>
                    <li id="detail-li-text">연박 예약 시 1박당 비용 발생</li>
                    <li id="detail-li-text">
                      숙박하지 않는 방문객 또한 위 금액과 동일한 비용이 발생
                    </li>
                    <li id="detail-li-text">최대인원 초과불가</li>
                    <li id="detail-li-text">현장 결제</li>
                    <li id="detail-li-text">
                      객실에 따라 가격이 상이할 수 있음
                    </li>
                  </div>
                </div>
                <div id="detail-linse-head-text">
                  Dining Hall
                  <div>
                    <li id="detail-li-text">{detailPension.dininghall}</li>
                  </div>
                </div>
                <div id="detail-linse-head-text">
                  펜션 서비스
                  <div>
                    <li id="detail-li-text-caution">
                      시설 이용문의 및 비용 별도 펜션문의 |{" "}
                      {detailPension.contact}
                    </li>
                    <li id="detail-li-text-caution">
                      {detailPension.amenities}
                    </li>
                  </div>
                </div>
                <div id="detail-linse-head-text">
                  바비큐 시설
                  <div>
                    <li id="detail-li-text-caution">
                      바베큐 시설 여부 : {detailPension.barbeque}
                    </li>
                    <li id="detail-li-text">
                      숯+그릴 대여 : 2인 기준 20,000원 (1인 추가시 5,000원) /
                      자이글 : 1SET 20,000원
                    </li>
                    <li id="detail-li-text">
                      이용시간 : 숯+그릴 (15:00~23:00), 자이글 (15:00~23:00)
                    </li>
                    <li id="detail-li-text">
                      이용장소 : 숯+그릴 (야외바비큐장 / 우천시 또는 동절기에도
                      이용가능), 자이글 (객실 내)
                    </li>
                    <li id="detail-li-text">현장 결제</li>
                  </div>
                </div>
                <div id="detail-lines" />
                <div id="detail-head-refund">
                  취소 및 환불 규정
                  <div id="detail-li-caution-head">
                    <li id="detail-li-text-caution">{detailPension.refund}</li>
                    <li id="detail-li-text">
                      취소, 환불 시 수수료가 발생할 수 있습니다
                    </li>
                  </div>
                </div>
                <div id="detail-lines" />
              </div>
              <section id="detail-bottom-section">
                <div id="detail-review-map-secsion">
                  위치
                  <div id="detail-bottom-kakao-map">
                    <div
                      id="map2"
                      style={{
                        width: 1200,
                        height: 480,
                        marginBottom: 10,
                        zIndex: 0,
                      }}
                    />
                    <div id="detail-bottom-kakao-map-address">
                      {detailPension.address}
                    </div>
                  </div>
                </div>
                <div id="detail-review-bottom-section">
                  <div></div>
                </div>
              </section>
            </div>
            <div id="detail-page-right-map-coupon-box">
              <div id="detail-right-map-box">
                <div id="map-short-box">
                  <div id="map"></div>
                  <div id="map-btn-icon">
                    <Button
                      className="btn"
                      style={{
                        background: "white",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "30px",
                        color: "black",
                        position: "absolute",
                        bottom: "15px",
                        left: "280px",
                        zIndex: "1",
                        width: "40px",
                        height: "40px",
                        padding: "0",
                      }}
                      onClick={handleMapPensionShow}
                    >
                      <img
                        id="mapOption-btn-img"
                        src={mapOption}
                        alt="최대화 옵션"
                      />
                    </Button>
                    <Modal
                      id="modalpage"
                      show={mapModalBtn}
                      onHide={handleMapPensionClose}
                    >
                      <Modal.Header id="modal-header-title" closeButton>
                        <Modal.Title id="modal-header-title">
                          {detailPension.name}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body id="modal-body-img">
                        <div>
                          <div
                            id="map3"
                            style={{
                              width: "100%",
                              height: 800,
                              borderRadius: 15,
                            }}
                          />
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
                <div id="map-pension-name">{detailPension.address}</div>
              </div>
              <br />
              <div id="detail-right-coupon-box">쿠폰 있을곳</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
