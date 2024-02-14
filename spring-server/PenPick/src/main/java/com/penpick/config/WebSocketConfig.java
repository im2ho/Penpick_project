package com.penpick.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //"topic"으로 시작되는 주제를 구독하는 클라이언트에게 메시지를 전송
        config.enableSimpleBroker("/topic");

        // 클라이언트에서 서버로 메시지를 전송할 때의 앞의 주소
        config.setApplicationDestinationPrefixes("/app");

        System.out.println("성공 1!");
    }

    //WebSocket 엔드포인트 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket")
        //프론트 주소 허용
        .setAllowedOrigins("http://localhost:3000")
        .withSockJS();

        System.out.println("성공 2!");
    }
    
}