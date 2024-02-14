package com.penpick.pension.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class pimg {

	@Id
	private String imageName;
	private Blob imageData;
	private String name;
}