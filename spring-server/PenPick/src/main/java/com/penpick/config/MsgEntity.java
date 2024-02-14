package com.penpick.config;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;

//응답 받은 결과 보여주는 곳
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class MsgEntity {

	private String msg;
	private Object result;
	
}