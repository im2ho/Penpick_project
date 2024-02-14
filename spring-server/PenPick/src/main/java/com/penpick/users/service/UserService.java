package com.penpick.users.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;

import lombok.Data;

@Data
@Service
public class UserService {

	@Autowired
    private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	//전체 사용자 조회 (api 테스트)
	public List<Users> getUserApi() {
        return userRepository.findAll();
    }
	
	//로그인 위한 회원 조회
	public Optional<Users> loginUser(String userEmail){
		return userRepository.findByUserEmail(userEmail);
	}
	
	//새로운 사용자 등록
	//회원가입 할 경우 비밀번호 암호화해서 DB 저장
    public Users registerUser(Users users) {
    	
    	Users user = new Users();
		user.setUserEmail(users.getUserEmail());
		
		//사용자가 비밀번호를 입력한대로 db에 저장하지 X
		//passwordEncoder를 사용해서 입력받은 비밀번호를 암호화 처리해서 저장하자
		user.setPassword(passwordEncoder.encode(users.getPassword())); 
		user.setNickname(users.getNickname());
		user.setGender(users.getGender());
		user.setPhoneNumber(users.getPhoneNumber());
		user.setBirthday(users.getBirthday());
		return userRepository.save(user);
	}
	
	//카카오 사용자 등록
	public Users registerKakaoUser(Users user) {
		return userRepository.save(user);
	}

	//회원 탈퇴
	public void deleteUser(Users user) {
	    userRepository.delete(user);
	}
	
	//비밀번호 변경
	public String changePassword(String userEmail, String currentPassword, String newPassword) {
        
		// 현재 로그인한 사용자 정보 가져오기
        Optional<Users> userOptional = userRepository.findByUserEmail(userEmail);

        Users user = userOptional.get();
        
        // 현재 비밀번호 일치 여부 확인
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return "현재 비밀번호가 일치하지 않습니다.";
        }

        // 새로운 비밀번호 설정
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return "비밀번호가 성공적으로 변경되었습니다.";
    }

	
//	==========================서동재 ============================
	public Users getUserByEmail(String email) {
		return userRepository.getUserByUserEmail(email);
	}
}