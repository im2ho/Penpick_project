import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import eventimg from '../img/이벤트1.png';
import eventimg2 from '../img/이벤트2.png';
import { useNavigate } from 'react-router';

function EventDetail() {
  const [contentList, setContentList] = useState({
    comments: '',
    content: '',
    content_id: '',
    commentdate: '',
    userId: '',
  });
  const [saveList, setSaveList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var day = ('0' + now.getDate()).slice(-2);
  const commentdate =
    year + '.' + month + '.' + day + '.' + hours + '.' + minutes;

  const searchContent = urlParams.get('content');

  useEffect(() => {
    setSearchTerm(searchContent);
    console.log(searchContent);
  }, [searchContent]);

  useEffect(() => {
    if (searchTerm !== '') {
      handleEventList();
    }
  }, [searchTerm]);

  const handleAddEvent = async () => {
    if (contentList.userId === '' || contentList.userId === null) {
      alert('로그인 후 댓글 등록이 가능합니다.');
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8282/event/addEvent`,
          contentList
        );
        console.log(contentList);
        setContentList({ comments: '' });
        alert('댓글 등록이 완료되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error('글 등록이 안됐어 ' + error);
      }
    }
  };

  const handleEventList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8282/event/eventDetailList`,
        { params: { contents: searchTerm } }
      );
      setSaveList(response.data);
    } catch (error) {
      console.error('글을 찾을 수가 없어요 ' + error);
    }
  };

  //로그인 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8282/userdata', {
          withCredentials: true,
        });

        const nickname = res.data.nickname;
        setContentList((prevContentList) => ({
          ...prevContentList,
          userId: nickname,
        }));
        console.log(res.data.nickname);
        console.log(contentList);
      } catch (err) {
        console.error('세션 데이터 불러오기 실패', err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(contentList); // 여기서 contentList를 출력해보세요.
  }, [contentList]);

  const imagePaths = {
    이벤트1: require('../img/이벤트1.png'),
    이벤트2: require('../img/이벤트2.png'),
    이벤트3: require('../img/이벤트3.png'),
  };

  return (
    <div>
      <Header />
      <div id='eventdetailMainContainer'>
        <div id='EventdetailCategory'>
          <h5 id='eventcategory'>이벤트</h5>
          <a id='eventlink1' href='eventPage'>
            이벤트
          </a>
          <br></br>
          <a href='GameLand' id='gamelandlink1'>
            게임랜드
          </a>
        </div>
        <div id='eventdetailSecondContainer'>
          <div id='Detailcontainer'>
            <div id='detailContent'>{searchTerm}</div>
            <div id='eventContentimgBox'>
              <img
                id='eventContentimg'
                src={imagePaths[searchTerm]}
                alt='이벤트'
              ></img>
            </div>
          </div>
          <div id='eventform' className='row'>
            <input
              className='form-control col-md-9'
              id='eventComments'
              type='text'
              value={contentList.comments}
              placeholder='댓글을 입력해주세요'
              onChange={(e) =>
                setContentList((prevContentList) => ({
                  ...prevContentList,
                  comments: e.target.value,
                  content: searchTerm,
                  content_id: null,
                  commentdate: commentdate,
                }))
              }
            ></input>
            <button
              className='btn btn-primary col-md-3'
              id='eventFormButton'
              onClick={handleAddEvent}
            >
              작성하기
            </button>
            {saveList.map((list) => (
              <div key={list.id}>
                <hr />
                <span id='eventReviewName'>{list.userId}</span>
                <br />
                {list.comments}
                <span id='eventCommentDate'>{list.commentdate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDetail;
