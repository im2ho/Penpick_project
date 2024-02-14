import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../../css/DetailsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function DetailKakaoMapModal() {
  // 카카오 지도 모달
  const [mapModalBtn, setmapModalBtn] = useState(false);

  const location = useLocation();

  //체크인 날짜 받기
  const inputcheckinDate = location.state?.inputcheckinDate;

  //체크아웃 날짜 받기
  const inputcheckoutDate = location.state?.inputcheckoutDate;

  // 인원수
  const peopleNumber = location.state?.peopleNumber;

  // 펜션 id
  const selectedId = location.state?.selectedId;

  const handleMapPensionShow = () => {
    setmapModalBtn(true);
  };

  const handleMapPensionClose = () => setmapModalBtn(false);

  // const urlParams = new URLSearchParams(window.location.search);
  // const selectedId = urlParams.get("id");
  const [searchDetail, setSearchDetail] = useState("");
  const [detailPension, setDetailPension] = useState([]);

  // 지도 보여주는 모달

  useEffect(() => {
    setSearchDetail(selectedId);
    if (selectedId !== null) {
      handleDetail();
      console.log("카카오 모달 성공");
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
        onClick={handleMapPensionShow}
      >
        크게 보기
      </Button>
      <Modal id="modalpage" show={mapModalBtn} onHide={handleMapPensionClose}>
        <Modal.Header id="modal-header-title" closeButton>
          <Modal.Title id="modal-header-title">
            {detailPension.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body-img">
          <div id="modalmap-body-div">
            <div id="map3" style={{ width: 800, height: 800 }} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DetailKakaoMapModal;
