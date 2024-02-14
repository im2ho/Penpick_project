package com.penpick.users.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.Data;

@Data
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

	@Autowired
    private UserService userService;
	
	private final PasswordEncoder passwordEncoder;
	
	//로그인 & 로그인한 유저 정보(userEmail) 세션에 저장하는 controller
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Users loginUser, HttpSession session) {
		
		//로그인 시도하는 이메일로 계정 존재여부 확인
		Optional<Users> userOptional = userService.loginUser(loginUser.getUserEmail());
		
		//계정 존재 할 시
		if (userOptional.isPresent()) {
			
			//해당 계정 정보
            Users user = userOptional.get();
            
            //로그인 시도하려는 계정의 비밀번호 (암호화 된 상태)
            String dbPassword = user.getPassword();
            
            //입력한 비밀번호
            String loginPassword = loginUser.getPassword();
            
            if (passwordEncoder.matches(loginPassword, dbPassword)) {
                session.setAttribute("user", user.getUserEmail());
                return ResponseEntity.ok("로그인 성공");
            }
            
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		
	}
	
	//로그인한 유저 정보 세션에서 불러오기
	@ResponseBody
	@GetMapping("/userdata")
    public ResponseEntity<Users> getUserData(HttpSession session) {
        
		String userEmail = (String) session.getAttribute("user");

        if (userEmail != null) {
            Optional<Users> userOptional = userService.loginUser(userEmail);

            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
	
	//로그아웃
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session, HttpServletResponse response) throws IOException {
	    session.invalidate();
	    System.out.println("로그아웃 성공");
	    // 클라이언트에 리디렉션을 요청
	    response.sendRedirect("localhost:3000/login");
	    
	    return ResponseEntity.ok("로그아웃 성공");
	}

	

 
}