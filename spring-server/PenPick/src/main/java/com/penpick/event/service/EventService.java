package com.penpick.event.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.event.model.EventPage;
import com.penpick.event.repository.EventRepository;

@Service
public class EventService {
	
	@Autowired
	private EventRepository eventRepository;

	//이벤트 목록 조회
	public List<EventPage> getEventList(){
		return eventRepository.findAll();
	}
	
	//이벤트 추가
	public EventPage addEvent(EventPage contentList) {
		return eventRepository.save(contentList);
	}
	
	//이벤트 삭제
	public String deleteEvent(int id) {
		return eventRepository.deleteById(id);
	}
	
	public List<EventPage> findEventList(String contents){
		return eventRepository.findByContent(contents);
	}
}
