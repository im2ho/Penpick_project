package com.penpick.pension.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class ImageDto {
	@Id
	private String imageName;
	private String imageData;
	private String name;
}
