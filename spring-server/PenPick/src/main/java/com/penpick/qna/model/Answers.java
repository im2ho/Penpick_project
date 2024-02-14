package com.penpick.qna.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Answers {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;
	
	private Long questionId;
    private String answerContent;
    private Date writtenDate;
}
