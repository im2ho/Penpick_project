import Stomp from "webstomp-client";
import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import "../css/PensionMainPage.css";
import user from "../img/userImg.png";

const Chat = () => {
  // 받은 메시지를 저장하기 위한 상태
  const [messages, setMessages] = useState([]);

  // Stomp 클라이언트를 저장하기 위한 상태
  const [stompClient, setStompClient] = useState(null);

  // 사용자로부터 입력받은 메시지를 저장하기 위한 상태
  const [inputMessage, setInputMessage] = useState("");

  const [anonymousMessage, setAnonymousMessage] = useState([]);

  const [myClientId, setMyClientId] = useState(null);

  // 컴포넌트가 마운트될 때 WebSocket 서버에 연결하기 위한 효과 훅
  useEffect(() => {
    const connect = () => {
      const socket = new SockJS("http://localhost:8282/websocket");
      console.log("여기까지 됨");
      const stomp = Stomp.over(socket);
      console.log("여기까지도 됨");

      if (socket.readyState !== 1) {
        stomp.connect({}, (frame) => {
          console.log("연결됨: " + frame);
          setStompClient(stomp);
          // const message = {
          //   clientId: 'stompClient.sessionId',
          // };

          // stomp.send('/app/connect', JSON.stringify({ message }));
          // stomp.subscribe('/topic/myClientId', (response) => {
          //   const newClientId = JSON.parse(response.body);
          //   setMyClientId(newClientId);
          // });
        });
      }

      return () => {
        socket.close();
      };
    };

    connect();
  }, []);

  const sendMessage = (content) => {
    if (stompClient && stompClient.connected) {
      const message = {
        content: content,
        sender: "user",
        direction: "sent",
        senderClientId: stompClient.sessionId,
      };
      // 메시지를 '/app/chat' 목적지로 서버에 전송
      stompClient.send("/app/websocket", JSON.stringify(message));
      console.log(JSON.stringify(message));

      setInputMessage("");
    } else {
      console.error("Stomp client is not initialized.");
    }
  };

  // '/topic/messages' 목적지에서 메시지를 구독하는 함수
  const subscribeToMessages = () => {
    // '/topic/messages' 목적지를 구독
    stompClient.subscribe("/topic/messages", (response) => {
      // 받은 메시지를 파싱하고 상태에 추가
      const message = JSON.parse(response.body);
      message.direction = "received";
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  // Stomp 클라이언트가 설정되면 메시지를 구독하기 위한 효과 훅
  useEffect(() => {
    if (stompClient) {
      subscribeToMessages();
    }
  }, [stompClient]);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var day = ("0" + now.getDate()).slice(-2);

  //input 값에
  //추가

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(inputMessage); //이동하고자하는 const 메서드 적기
    }
  };

  return (
    <div>
      <div id="ChatContainer">
        <div id="firstChatbox">
          <p id="ChatInformation">
            {year}년{month}월{day}일
          </p>
          <p id="ChatInformation" class="chatinfo">
            채팅방에 입장하셨습니다.
          </p>

          {messages.map((message, index) => (
            <div
              id="userInputMessage"
              key={index}
              className={
                message.senderClientId === messages[0].senderClientId
                  ? "sentByUser1"
                  : "sentByUser2"
              }
            >
              <img
                className={
                  message.senderClientId === messages[0].senderClientId
                    ? "MessageUseImg1"
                    : "MessageUseImg2"
                }
                id="MessageUseImg"
                src={user}
                alt="유저"
              ></img>

              <span
                className={
                  message.senderClientId === messages[0].senderClientId
                    ? "messageContent1"
                    : "messageContent2"
                }
                id="messageContent"
              >
                {message.content}
              </span>
              <span
                className={
                  message.senderClientId === messages[0].senderClientId
                    ? "currentTime1"
                    : "currentTime2"
                }
                id="currentTime"
              >
                {hours}:{minutes}
              </span>
            </div>
          ))}
        </div>
        <div id="messageInput">
          <input
            id="messageInputBox"
            type="text"
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
            maxLength={"15"}
            placeholder="메세지를 입력하세요 "
          />
          <button id="ChatSendButton" onClick={() => sendMessage(inputMessage)}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
