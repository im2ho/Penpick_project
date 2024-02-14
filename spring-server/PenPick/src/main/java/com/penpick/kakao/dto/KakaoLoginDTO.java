package com.penpick.kakao.dto;

import lombok.Builder;
import lombok.Data;

//DTO(Data Transfer Object)
//React에서 전송한 Kakao 로그인 정보를 담는 클래스
@Builder
@Data
public class KakaoLoginDTO {
   
	private String access_token;
	private String email;
	private String nickname;

}