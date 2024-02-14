import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function DetailServiceModal() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const selectedId = urlParams.get("id");
  const [searchDetail, setSearchDetail] = useState("");
  const [detailPension, setDetailPension] = useState([]);
  const location = useLocation();

  //체크인 날짜 받기
  const inputcheckinDate = location.state?.inputcheckinDate;

  //체크아웃 날짜 받기
  const inputcheckoutDate = location.state?.inputcheckoutDate;

  // 인원수
  const peopleNumber = location.state?.peopleNumber;

  // 펜션 id
  const selectedId = location.state?.selectedId;

  // 서비스 정보 보여주는 모달
  const [ServiceModalButton, setServiceModalButton] = useState(false);

  const handleServiceShow = () => setServiceModalButton(true);

  const handleServiceClose = () => setServiceModalButton(false);

  useEffect(() => {
    setSearchDetail(selectedId);
    if (selectedId !== null) {
      handleDetail();
      console.log(selectedId);
    } else {
      console.log("검색값 없음");
    }
  }, [searchDetail]);

  const handleDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8282/penpick/details`, {
        params: {
          id: searchDetail,
        },
      });
      // console.log(res.data);
      setDetailPension(res.data);
      // console.log(detailPension);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <span>
      <Button
        id="modal-service-btn"
        style={{
          background: "white",
          border: "none",
          fontSize: "13px",
          fontWeight: "600",
          padding: "1px",
          cursor: "pointer",
          float: "right",
          padding: "3px 0 0 0",
        }}
        onClick={handleServiceShow}
      >
        더보기 ＞
      </Button>
      <Modal
        id="service-modalpage"
        show={ServiceModalButton}
        onHide={handleServiceClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-header-title">서비스 및 부대시설</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body-main">
          <div>
            <li id="modal-body-text-room">
              세미나 룸 :{detailPension.seminar}
            </li>

            <li id="modal-body-text-room">
              스포츠 시설 :{detailPension.sports}
            </li>
            <li id="modal-body-text-room">사우나 : {detailPension.sauna}</li>
            <li id="modal-body-text-room">
              뷰티 룸:
              {detailPension.beauty}
            </li>
            <li id="modal-body-text-room">노래방 :{detailPension.karaoke}</li>
            <li id="modal-body-text-room">
              바베큐장 :{detailPension.barbeque}
            </li>
            <li id="modal-body-text-room">
              캠프 파이어:
              {detailPension.campfire}
            </li>
            <li id="modal-body-text-room">
              PC 시설:
              {detailPension.pc_room}
            </li>
            <li id="modal-body-text-room">
              오픈 샤워실:
              {detailPension.public_shower}
            </li>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </span>
  );
}

export default DetailServiceModal;
