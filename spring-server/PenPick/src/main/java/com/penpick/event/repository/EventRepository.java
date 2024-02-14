package com.penpick.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.penpick.event.model.EventPage;

public interface EventRepository extends JpaRepository<EventPage,Long>{

	String deleteById(int id);
	
	@Query("select e from  EventPage e  where content = :contents order by commentdate")
	List<EventPage> findByContent(String contents);

}