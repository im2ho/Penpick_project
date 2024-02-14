package com.penpick.pension.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Pensions{

	@Id
	private Long id;
	
	private String  name;
	
	private String contact;
	
	private String address;
	
	private Float latitude;
	
	private Float longitude;
	
	private String introduction;
	
	private String scale;
	
	private String parking;
	
	private String cook;
	
	private String check_in;
	
	private String check_out;
	
	private String dininghall;
	
	private String amenities;
	
	private String seminar;
	
	private String sports;
	
	private String sauna;
	
	private String beauty;
	
	private String karaoke;
	
	private String barbeque;
	
	private String campfire;
	
	private String pc_room;
	
	private String public_shower;
	
	private String refund;
	
	private int double_room;
	
	private int triple_room;
	
	private int family_room;
	
	private int group_room;

	
	
	
	
	
	
	
	
}