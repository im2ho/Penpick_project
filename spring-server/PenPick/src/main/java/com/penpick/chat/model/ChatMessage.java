package com.penpick.chat.model;


import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class ChatMessage {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="chat_seq")
	@SequenceGenerator( name = "chat_seq",sequenceName = "chat_seq", allocationSize = 1)
    @Column(name = "conversation_id")
    private Integer id;
    private String content;
    private String sender;
    @DateTimeFormat(pattern="HH:mm:ss")
    private Date currentTime;
    private String direction;
    private String senderClientId;
 

}