package com.penpick.pension.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class PensionsImg {

	@Id
	private String imageName;
	private Blob imagePath;
	private String name;
}