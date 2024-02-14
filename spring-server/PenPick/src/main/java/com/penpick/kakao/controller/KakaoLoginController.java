package com.penpick.kakao.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.kakao.dto.KakaoLoginDTO;
import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class KakaoLoginController {

	// 멤버(필드)변수
	@Autowired
	private UserService userService;

	// 카카오 로그인 정보 DB & 세션에 저장
    @PostMapping("/kakao-login")
    public ResponseEntity<String> handleKakaoLogin(@RequestBody KakaoLoginDTO kakaoLoginDTO, HttpSession session) {
    	
    	// 클라이언트에서 전송한 데이터를 받아와서 처리
        String accessToken = kakaoLoginDTO.getAccess_token();
        String email = kakaoLoginDTO.getEmail();
        String nickname = kakaoLoginDTO.getNickname();
        
        // 이미 저장된 사용자인지 확인
        Optional<Users> existingUser = userService.loginUser(email);

        if(existingUser.isPresent()) {
        	
        	//이미 계정이 존재하는 경우 세션에만 저장
            session.setAttribute("user", email);
            
            return ResponseEntity.ok("카카오 로그인 성공");
        
        } else {
        	
        	// Kakao 로그인 정보 DB에 저장
            Users user = new Users();
            user.setAccess_token(accessToken);
            user.setUserEmail(email);
            user.setNickname(nickname);
            
            userService.registerKakaoUser(user);
            
            //세션에 사용자 정보 저장
            session.setAttribute("user", email);
            
            return ResponseEntity.ok("카카오 회원가입 및 로그인 성공");
        }
        
    }
    
}