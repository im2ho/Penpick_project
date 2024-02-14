package com.penpick.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.event.model.EventPage;
import com.penpick.event.service.EventService;

@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired 
	private EventService eventService;
	
	//이벤트 목록 조회
	@GetMapping("/eventList")
	public List<EventPage> EventList(){
		return eventService.getEventList();
	}
	
	//이벤트 목록 조회
	@GetMapping("/eventDetailList")
	public List<EventPage> EventDetailList(String contents){
		return eventService.findEventList(contents);
	}

	//이벤트 추가
	@PostMapping("/addEvent")
	public ResponseEntity<EventPage> addEvent(@RequestBody EventPage contentList) {
		System.out.println(contentList);
		EventPage eventPage = eventService.addEvent(contentList);
		return ResponseEntity.ok(eventPage);
	}
	

}
