import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function DetailGroupRoomModal() {
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

  // 펜션 상세 정보 보여주는 모달
  const [DetailPensionModalButton, setDetailPensionModalButton] =
    useState(false);

  const handleDetailPensionShow = () => setDetailPensionModalButton(true);

  const handleDetailPensionClose = () => setDetailPensionModalButton(false);

  useEffect(() => {
    setSearchDetail(selectedId);
    if (selectedId !== null) {
      handleDetail();
      console.log("그룹 모달 성공");
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
    <div>
      <Button
        id="modal-room-btn"
        style={{
          border: "none",
          fontSize: "13px",
          fontWeight: "600",
          padding: "1px",
          cursor: "pointer",
          float: "right",
          padding: "3px 0 0 0",
        }}
        onClick={handleDetailPensionShow}
      >
        상세정보 ＞
      </Button>
      <Modal
        id="service-modalpage"
        show={DetailPensionModalButton}
        onHide={handleDetailPensionClose}
      >
        <Modal.Header id="modal-header-title" closeButton>
          <Modal.Title id="modal-header-title">
            {detailPension.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body-main-room">
          <div id="modal-section">
            <p id="modal-body-text-room-title">객실 정보</p>
            <li id="modal-body-text-room">
              숙박 | 체크인 {detailPension.check_in} - 체크아웃{" "}
              {detailPension.check_out}
            </li>
            <li id="modal-body-text-room">6인 기준 최대 8인 (유료)</li>
            <li id="modal-body-text-room">
              인원 추가시 비용이 발생되며, 현장에서 결제 바랍니다.
            </li>
            <li id="modal-body-text-room">{detailPension.scale}</li>
          </div>
        </Modal.Body>
        <Modal.Footer id="modal-footer-room">
          <div id="modal-section">
            <p id="modal-footer-text-room-title">편의 시설</p>
            <li id="modal-body-text-room">
              세미나 룸 :{detailPension.seminar}
            </li>
            <li id="modal-body-text-room">운동 시설 :{detailPension.sports}</li>
            <li id="modal-body-text-room">사우나 :{detailPension.sauna}</li>
            <li id="modal-body-text-room">뷰티 룸 :{detailPension.beauty}</li>
            <li id="modal-body-text-room">노래방 :{detailPension.karaoke}</li>
            <li id="modal-body-text-room">
              바베큐장 :{detailPension.barbeque}
            </li>
            <li id="modal-body-text-room">
              캠프파이어 :{detailPension.campfire}
            </li>
            <li id="modal-body-text-room">PC방 :{detailPension.pc_room}</li>
            <li id="modal-body-text-room">
              공개 샤워실 :{detailPension.public_shower}
            </li>
          </div>
          <div id="modal-section">
            <p id="modal-footer-text-room-title">취소 및 환불 규정</p>
            <div id="modal-footer-refund-box">
              <li id="modal-footer-refund-text">{detailPension.refund}</li>
              <li id="modal-footer-refund-text">
                취소, 환불시 수수료가 발생할 수 있습니다.
              </li>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailGroupRoomModal;
