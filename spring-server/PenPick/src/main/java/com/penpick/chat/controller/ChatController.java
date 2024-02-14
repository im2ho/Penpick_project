package com.penpick.chat.controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.penpick.chat.model.ChatMessage;

@Controller
public class ChatController {

	// 클라이언트로부터 메시지를 받는 핸들러
    @MessageMapping("/websocket")
    // 메시지를 특정 주제로 브로드캐스트하여 클라이언트에게 전송
    @SendTo("/topic/messages")
    public ChatMessage send(@Payload ChatMessage message, SimpMessageHeaderAccessor accessor) throws Exception {
    	System.out.println("hi");
        Thread.sleep(1000); // simulated delay
        String senderClientId = accessor.getSessionId();
        System.out.println(message.getSenderClientId());
        	message.setSenderClientId(senderClientId);
     
        // 메세지 전송
        return message;
    }
    
  
//    @MessageMapping("/connect")
//    @SendTo("/topic/myClientId")
//    public ChatUser connect(@Payload ChatUser user, SimpMessageHeaderAccessor accessor) {
//        // 클라이언트에게 고유한 clientId 전송
//    	String senderClientId = accessor.getSessionId();
//    	user.setSenderClientId(senderClientId);
//    	return user;
//    }
}