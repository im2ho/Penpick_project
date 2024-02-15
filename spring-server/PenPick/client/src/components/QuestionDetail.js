import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import AnswerToQuestion from './AnswerContent';
import '../css/questiondetail.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QuestionDetail() {
  const { questionId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8282/QnA/questionDetail/${questionId}`,
          {
            withCredentials: true,
          }
        );
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post data: ', err);
      }
    };
    fetchPostData();
  }, [questionId]);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return ''; // 유효하지 않은 날짜 문자열 처리
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString)
      .toLocaleDateString('ko-KR', options)
      .replace(/\. /g, '-')
      .replace('.', '');
  };

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
        <br />
        <div id='question-content'>
          <h3>
            <b style={{ color: 'blueviolet' }}>Q. </b>
            {post?.questionTitle}
          </h3>
          <br />
          <span>{formatDate(post?.writtenDate)}</span>
          <span style={{ marginLeft: '10px' }}>|</span>
          <span style={{ marginLeft: '10px' }}>{post?.nickname}</span>
          <hr />
          <br />
          <br />
          <p>{post?.questionContent}</p>
        </div>
        <br />
        <AnswerToQuestion questionId={questionId} />
      </div>
    </div>
  );
}
