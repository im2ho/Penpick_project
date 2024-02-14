package com.penpick.users.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.penpick.users.model.Users;
import com.penpick.users.service.MailService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MailController {

	@Autowired //오류나면 여기 지우기
    private final MailService mailService;
    
	//회원가입 이메일 인증 코드 보내기
    @ResponseBody
    @PostMapping("/mail")
    public String mailSend(@RequestBody Map<String, String> requestBody){    	
    	
    	String mail = requestBody.get("mail");
        
    	//이메일 중복 체크
    	Optional<Users> user = mailService.FindUserByEmail(mail);
    	
    	//이미 사용중인 계정일 경우...
    	if(user.isPresent()) {
    		
    		Users existUser = user.get();
    		String userToken = existUser.getAccess_token();
    		
    		//access_token의 유무로 이메일 유저, 카카오 로그인 유저 구별 가능
    		if(userToken == null) {
    			return "existUser";
    		} else {
    			return "kakaoUser";
    		}
    		
    	}
    	
        int number = mailService.sendMail(mail);
        return String.valueOf(number);
    }
    
    //비밀번호 재설정 인증메일 보내기
    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        
    	String email = request.get("email");
    	
    	//회원 존재 여부 체크
    	Optional<Users> user = mailService.FindUserByEmail(email);
    	
    	if(user.isPresent()) {
    		
    		Users existUser = user.get();
    		String userToken = existUser.getAccess_token();
    		
    		//이메일 회원일 경우
    		if(userToken == null) {
    			
    			try {
                    // 새로운 임시 비밀번호 생성
                    String newPassword = mailService.createNewPassword();

                    // 재설정된 비밀번호를 이메일로 전송
                    mailService.sendNewPasswordMail(email, newPassword);

                    // 사용자의 비밀번호를 새로운 임시 비밀번호로 업데이트
                    mailService.updatePasswordByEmail(email, newPassword);

                    return ResponseEntity.ok("비밀번호 재발급 이메일을 발송했습니다. 로그인을 시도해주세요.");
                    
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("비밀번호 재설정에 실패했습니다.");                
                }
    			
    		} else {
    			
    			//소셜로그인 회원일 경우
    			return ResponseEntity.ok("소셜 로그인 계정입니다. 다른 방법으로 로그인을 시도해주세요.");
    		}
    		
    	} else {
    		return ResponseEntity.ok("존재하지 않는 회원 정보입니다.");
    	}

    }

}