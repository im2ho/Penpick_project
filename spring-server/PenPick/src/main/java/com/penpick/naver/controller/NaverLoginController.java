package com.penpick.naver.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.naver.dto.NaverLoginDTO;
import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class NaverLoginController {

	@Autowired
	private UserService userService;
	
	//네이버 로그인 정보 DB & 세션 저장
	@PostMapping("/naver-login")
	public ResponseEntity<String> handleNaverLogin(@RequestBody NaverLoginDTO naverLoginDTO, HttpSession session){
		
		//클라이언트에서 전송한 데이터를 받아와서 처리
		String accessToken = "naverUser";
		String email = naverLoginDTO.getEmail();
		String nickname = naverLoginDTO.getNickname();
		
		//이미 저장된 사용자인지 확인
		Optional<Users> existingUser = userService.loginUser(email);
		
		if(existingUser.isPresent()) {
			
			//이미 계정이 존재하는 경우 세션에만 저장
			session.setAttribute("user", email);
			
			return ResponseEntity.ok("네이버 로그인 성공");
		
		} else {
			
			// Naver 로그인 정보 DB에 저장
			Users user = new Users();
			user.setAccess_token(accessToken);
			user.setUserEmail(email);
			user.setNickname(nickname);
			
			userService.registerKakaoUser(user);
			
			//세션에 사용자 정보 저장
			session.setAttribute("user", email);
			
			return ResponseEntity.ok("네이버 회원가입 및 로그인 성공");
		}
	}
}
