package com.penpick.event.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
public class EventPage {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="events_seq")
	@SequenceGenerator(name = "events_seq",sequenceName = "events_seq", allocationSize = 1)
	private Long id;
	
	private String content;
	
	private String comments;
	
	private String content_id;
	
	private String commentdate;
	
	private String userId;
	
}