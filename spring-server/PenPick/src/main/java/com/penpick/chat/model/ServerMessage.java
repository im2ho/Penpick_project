package com.penpick.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Data
@Entity
public class ServerMessage {
	@Id
	@SequenceGenerator(name = "chat_message_seq", sequenceName = "chat_message_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_message_seq")
	private int id;
    private String content;
    private String sender;
}