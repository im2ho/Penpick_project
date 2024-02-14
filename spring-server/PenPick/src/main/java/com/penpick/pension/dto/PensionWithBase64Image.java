package com.penpick.pension.dto;

import com.penpick.pension.model.Pensions;

import lombok.Data;


@Data
public class PensionWithBase64Image {

	 public PensionWithBase64Image(Pensions pension2, String base64Image2) {
	}
	private Pensions pension;
	 private String base64Image;
	
}
