package com.penpick.qna.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Questions {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
	
    private String questionTitle;
    private String questionContent;
    private String nickname;
    private Date writtenDate;
    
}
