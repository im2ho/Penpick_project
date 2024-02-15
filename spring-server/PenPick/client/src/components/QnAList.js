import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../css/questionlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QnAList() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  //로그인 유저
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      }
    };
    fetchUserData();
  }, []);

  const setAuthentication = (userEmail) => {
    if (userEmail !== '') {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8282/QnA/questionList?page=${
            currentPage - 1
          }&size=10`,
          {
            withCredentials: true,
          }
        );
        setPosts(response.data.content); // 페이지에 해당하는 게시글 데이터
        setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    fetchPostsData();
  }, [currentPage]);

  // 페이지 번호 클릭 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 버튼 렌더링
  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? 'active' : ''}
          id={`page-${i}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  function gotoWriteQuestion() {
    if (isAuthenticated) {
      window.location.href = '/writeQuestion';
    } else {
      alert('로그인 후 이용해주세요');
      window.location.href = '/login';
    }
  }

  return (
    <div>
      <Header />
      <div id='QnA-header'>
        <h4>
          <strong>고객센터</strong>
        </h4>
        <p id='QnA-description'>어려움이나 궁금한 점이 있으신가요?</p>
      </div>
      <div id='QnA-container'>
        <button
          className='button'
          onClick={gotoWriteQuestion}
          id='write-button'
        >
          글 쓰기
        </button>
        <div className='container mt-3' id='question-list-container'>
          <table className='table' id='question-table'>
            <thead className='thead-light'>
              <tr>
                <th id='column-number'>no.</th>
                <th id='column-title'>제목</th>
                <th id='column-author'>작성자</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(posts) &&
                posts.map((post) => (
                  <tr key={post.questionId}>
                    <td>{post.questionId}</td>
                    <td>
                      <Link to={`/questionDetail/${post.questionId}`}>
                        <span id='qnaTitle'>{post.questionTitle}</span>
                      </Link>
                    </td>
                    <td>{post.nickname}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='pagination' id='pagination-container'>
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
}
