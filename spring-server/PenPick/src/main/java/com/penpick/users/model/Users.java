package com.penpick.users.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@Entity
@Table(name="PenpickUser")
@NoArgsConstructor
public class Users {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
	
    private String password;
    
    private String phoneNumber;
    
    private String gender;
    
    private String nickname;
    
    private Date birthday;
    
    private String access_token;
    
    public Users(Long id) {
        this.id = id;
    }
    
}