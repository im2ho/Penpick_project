package com.penpick.users.controller;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.users.dto.ChangePasswordDTO;
import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;
import com.penpick.users.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.Data;

@Data
@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true")
public class UserController {
   
	@Autowired
    private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	//전체 사용자 리스트 (api 테스트용)
	@ResponseBody
	@GetMapping
	public List<Users> userApi() {
        return userService.getUserApi();
    }

    //회원가입 창
    @PostMapping("/add")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
    	Users saveUser = userService.registerUser(user);
    	return ResponseEntity.ok(saveUser);
    }
    
    //마이페이지 정보 수정
    @PutMapping("/update")
    public ResponseEntity<Users> updateUser(@RequestBody Users updatedUser, HttpSession session) {
        
    	//세션에서 로그인한 유저 정보 불러오기
    	String userEmail = (String) session.getAttribute("user");

        if (userEmail != null) {
            
        	//세션에 저장된 이메일 통해 계정 찾기
        	Optional<Users> existingUser = userService.loginUser(userEmail);
            
        	if (existingUser.isPresent()) {
                
        		Users user = existingUser.get();
        		
                //업데이트 로직 적용
                user.setUserEmail(updatedUser.getUserEmail());
                user.setNickname(updatedUser.getNickname());
                user.setPhoneNumber(updatedUser.getPhoneNumber());
                user.setGender(updatedUser.getGender());
                user.setBirthday(updatedUser.getBirthday());
                

                //Users savedUser = userService.registerUser(user);
                Users editedUser = userRepository.save(user);
                return ResponseEntity.ok(editedUser);
                
                
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    //비빌번호 재설정
    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO request, HttpSession session) {
  
    	String userEmail = (String) session.getAttribute("user");

        String result = userService.changePassword(userEmail, request.getCurrentPassword(), request.getNewPassword());

        if (result.startsWith("비밀번호가")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    //회원 탈퇴 컨트롤러
    @DeleteMapping("/signOut")
    public ResponseEntity<String> deleteUser(HttpSession session) {
    	
        String userEmail = (String) session.getAttribute("user");

        if (userEmail != null) {
            Optional<Users> existingUser = userService.loginUser(userEmail);

            if (existingUser.isPresent()) {
                userService.deleteUser(existingUser.get());
                session.invalidate(); // 로그아웃을 위해 세션 무효화

                return ResponseEntity.ok("회원 탈퇴가 완료되었습니다");
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
}