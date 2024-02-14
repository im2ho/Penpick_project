package com.penpick.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.penpick.users.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

	
	public Optional<Users> findByUserEmail(String userEmail);
	
//	==================================서동재 =============================//
	
	
	Users getUserByUserEmail(String email);
	
	
}