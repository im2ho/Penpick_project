package com.penpick.naver.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NaverLoginDTO {

	private String email;
	private String nickname;
	
}
