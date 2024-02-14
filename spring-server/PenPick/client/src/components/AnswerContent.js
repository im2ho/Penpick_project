import React, { useEffect, useState } from "react";
import axios from "axios";
import WriteAnswer from "./WriteAnswer";
import '../css/AnswerContent.css';

const AnswerToQuestion = ({ questionId }) => {

  const [answer, setAnswer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  // 답변 작성 폼 표시 여부
  const [showWriteAnswerForm, setShowWriteAnswerForm] = useState(false);

  //로그인 유저
  const [userEmail, setUserEmail] = useState('');

  //관리자 유무 체크
  const [isAdmin, setIsAdmin] = useState(false);

  //로그인 정보 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:8282/userdata', {
          withCredentials: true,
        });
        setUserEmail(res.data.userEmail);
        if(res.data.userEmail === 'tpgml4606@gmail.com'){
          setIsAdmin(true);
          console.log(true); // isAdmin이 true로 설정된 직후에 관리자 상태 확인
        }
      } catch (err) {
        console.error('세션 데이터 불러오기 실패', err);
      } 
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8282/QnA/answers/${questionId}`,
          {
            withCredentials: true,
          }
        );
        setAnswer(response.data);
        setEditedContent(response.data ? response.data.answerContent : "");
      } catch (err) {
        console.error("Error fetching answer: ", err);
      }
    };

    fetchAnswer();
  }, [questionId]);

  const formatDate = (dateString) => {
    if (!dateString) return ""; 
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\. /g, "-")
      .replace(".", "");
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8282/QnA/answers/${answer.questionId}`,
        {
          questionId: answer.questionId,
          answerContent: editedContent,
          writtenDate: new Date().toISOString(),
        },
        {
          withCredentials: true,
        }
      );
      setAnswer({ ...answer, answerContent: editedContent });
      setEditMode(false);
      alert("답변이 수정되었습니다.");
    } catch (err) {
      console.error("답변 수정 오류 : ", err);
      alert("답변 수정이 되지 않았습니다.");
    }
  };

  const toggleWriteAnswerForm = () => {
    setShowWriteAnswerForm(!showWriteAnswerForm);
  };

  if (!answer && !showWriteAnswerForm) {
    return (
      <div id="no-answer-content">
        <br /><br /><br />
        <p>아직 답변이 작성되지 않았습니다.</p>
        {/* 관리자 계정일 경우만 수정 가능 */}
        {isAdmin ? (
          <button id="write-answer-button" onClick={toggleWriteAnswerForm}>답변 작성</button>
        ) : (
          null
        )}
      </div>
    );
  }

  return (
    <div id="answer-content">
      {showWriteAnswerForm ? (
        <div id="no-answer-content">
          <WriteAnswer questionId={questionId} />
          <button 
            id="write-answer-button" 
            onClick={toggleWriteAnswerForm}
            style={{float:"right", marginRight:"20px"}}
          >
            취소
          </button>
        </div>
      ) : editMode ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button 
            onClick={handleSave}
            style={{float:"right"}}
          >
            저장
          </button>
        </>
      ) : (
        <>
          <h4><b style={{color:"green"}}>A. </b>답변입니다</h4><br />
          <p>{formatDate(answer?.writtenDate)}</p>
          <hr /><br /><br />
          <p>{answer.answerContent}</p>
          {/* 관리자 계정일 경우만 수정 가능 */}
          {isAdmin ? (
            <button 
              onClick={handleEdit}
              style={{float:"right"}}
            >
             수정하기
            </button>
          ) : (
            null
          )}
        </>
      )}
    </div>
  );
};

export default AnswerToQuestion;
