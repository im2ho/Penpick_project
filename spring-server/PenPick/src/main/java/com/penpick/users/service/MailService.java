package com.penpick.users.service;

import java.security.SecureRandom;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.penpick.users.model.Users;
import com.penpick.users.repository.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class MailService {

	@Autowired
	private final UserRepository userRepository;
	
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "tpgml0816@gmail.com";
    
    private final PasswordEncoder passwordEncoder;
    
    //이메일 조회
  	public Optional<Users> FindUserByEmail(String userEmail){
  		return userRepository.findByUserEmail(userEmail);
  	}

    //인증번호 생성
    public int createNumber() {
        return (int) (Math.random() * 90000) + 100000;
    }

    //메일 양식
    public MimeMessage createMail(String mail) {
        int number = createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(mail));
            message.setSubject("[PenPick] 회원 가입 인증 메일");
            String body = "<h3>PenPick 회원가입 인증 번호입니다.</h3><h1>" + number + "</h1><h3>감사합니다.</h3>";
            message.setContent(body, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    //메일 발송
    public int sendMail(String mail) {
        MimeMessage message = createMail(mail);
        javaMailSender.send(message);
        return createNumber();
    }
    
    /******************비밀번호 재설정 메일 발송 관련******************/
    
    //임시 비밀번호 생성 메서드
    public String createNewPassword() {
        
    	String ALPHABETS_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    	String DIGITS = "0123456789";
    	String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?";
    	
    	String allCharacters = ALPHABETS_CHARACTERS + DIGITS + SPECIAL_CHARACTERS;

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // 최소 한 번은 알파벳, 숫자, 특수문자를 포함하도록 조건 추가
        password.append(ALPHABETS_CHARACTERS.charAt(random.nextInt(ALPHABETS_CHARACTERS.length())));
        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));

        for (int i = 0; i < 5; i++) {
            int randomIndex = random.nextInt(allCharacters.length());
            password.append(allCharacters.charAt(randomIndex));
        }

        return password.toString();
    }
    
    //임시비밀번호 발급 메일 양식
    public MimeMessage createResetPasswordEmail(String email, String newPassword) {
    	
    	MimeMessage message = javaMailSender.createMimeMessage();
    	
    	try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject("[PenPick] 비밀번호 재설정");
            String body = "<h3>PenPick 임시 발급 비밀번호입니다.</h3>"
            		+ "<h1>" + newPassword  + "</h1>"
            		+ "<h3>해당 번호는 임시로 발급된 번호이니 사용자의 재설정이 필요합니다.</h3>"
            		+ "<h3>감사합니다</h3>";
            message.setContent(body, "text/html; charset=utf-8");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
        
    }
    
    //임시 비밀번호 발급 메일 발송
    public String sendNewPasswordMail(String mail, String newPassword) {
        MimeMessage message = createResetPasswordEmail(mail, newPassword);
        javaMailSender.send(message);
        return newPassword;
    }
    

    public void updatePasswordByEmail(String email, String newPassword) {
    	
        Optional<Users> userOptional = userRepository.findByUserEmail(email);

        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            
            // 새로운 비밀번호 설정
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
        } else {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
    }
    
}

