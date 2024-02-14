import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../css/PensionMap.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PensionImg from '../img/꽃지화이트펜션_2_공공3유형.jpg';
import markerImg from '../img/마커2.png';

const PensionMap = () => {
  const [pensionData, setPensionData] = useState([]);
  const location = useLocation();
  const term = location.state?.searchTerm;

  useEffect(() => {
    const handleSearch = async () => {
      const response = await axios
        .get(`http://localhost:8282/penpick/searchAll`, {
          params: {
            term: term,
          },
        })
        .then((response) => {
          const responseData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setPensionData(responseData);
          loadKakaoMap(responseData);
          console.log(responseData);
        })
        .catch((error) => console.log('에러가 났어요ㅠㅠ => ', error));
    };
    handleSearch();
  }, []);

  const loadKakaoMap = (responseData) => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=5f5613b170ddc98c39f71811791f5fc8&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const latitude = responseData[0].latitude;
        const longitude = responseData[0].longitude;
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        var mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        for (var i = 0; i < responseData.length; i++) {
          createMarkerAndOverlay(map, responseData[i]);
        }
      });
    };
  };

  const createMarkerAndOverlay = (map, data) => {
    var imageSrc = markerImg,
      imageSize = new window.kakao.maps.Size(45, 69),
      imageOption = { offset: new window.kakao.maps.Point(23, 69) };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const markerPosition = new window.kakao.maps.LatLng(
      data.latitude,
      data.longitude
    );

    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    const iwContent = `
      <div class="wrap">
        <div class="info">
          <div class="title" style="font-weight:900">${data.name}
          </div>
          <div id='mapSmallBox'>
            <div class="body">
              <div class="img">
                <img src=${PensionImg} width="73" height="70">
              </div>
              <div class="desc">
                <div class="ellipsis" style="font-size:13px;color:gray;">${data.address}</div>
                <div><a id='mapdetailLink' href="http://localhost:3000/PensionList?region=${data.name}" target="_blank" class="link">상세보기</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: iwContent,
    });

    let isOpen = false;

    window.kakao.maps.event.addListener(marker, 'click', function () {
      if (isOpen) {
        customOverlay.setMap(null);
        isOpen = false;
      } else {
        customOverlay.setMap(map);
        isOpen = true;
      }
    });

    marker.setMap(map);
  };

  return (
    <div>
      <Header />
      <div
        id='map'
        style={{
          width: '100%',
          height: '875px',
          margin: 'auto',
          zIndex: '2',
          marginTop: '80px',
        }}
      ></div>
    </div>
  );
};

export default PensionMap;