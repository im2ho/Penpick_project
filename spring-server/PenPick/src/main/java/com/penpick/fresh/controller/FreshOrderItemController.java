package com.penpick.fresh.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.fresh.model.FreshCartItem;
import com.penpick.fresh.model.FreshOrderItem;
import com.penpick.fresh.service.FreshOrderItemService;
import com.penpick.reservation.model.Reservation;
import com.penpick.reservation.service.ReservationService;

@RestController
@RequestMapping("/freshorder")

public class FreshOrderItemController {
	
	@Autowired
	private FreshOrderItemService freshorderitemService;
	
	public FreshOrderItemController(FreshOrderItemService freshorderitemService) {
        this.freshorderitemService = freshorderitemService;
	}
	
	@GetMapping
	public String freshOrderItemList() {
		return "redirect:/freshorder/list";
	}
	
	@GetMapping("/FreshOrderIds")
	public List<FreshOrderItem> getFreshOrderItemByReservationId(@RequestParam("resnum") Long resnum) {
	    return freshorderitemService.findFreshOrderItemByReservationId(resnum);
	}
	
	
	@GetMapping("/list")
	public ResponseEntity<List<FreshOrderItem>> getAllFreshOrderItem() {
		List<FreshOrderItem> freshorderitemList = null;
		try {
			freshorderitemList = freshorderitemService.getAllFreshOrderItem();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(freshorderitemList);
	}
	
	@GetMapping("/{resnum}")
	public ResponseEntity<Optional<FreshOrderItem>> getFershOrderItem(@PathVariable Long res_num){
		Optional<FreshOrderItem> freshorderitem = freshorderitemService.getOrderItems(res_num);
		
		if(freshorderitem.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}else {
			return ResponseEntity.ok(freshorderitem);		
		}
	}
	
	@PostMapping("/add")
	public ResponseEntity<Void> registerFershOrderItem(@RequestBody FreshOrderItem freshorderitem) {
		freshorderitemService.saveFreshOrderItem(freshorderitem);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{item_num}")
	public ResponseEntity<String> deleteFreshCartItem(@PathVariable FreshOrderItem freshorderitem){
		freshorderitemService.deleteFreshOrderItem(freshorderitem);
		return ResponseEntity.ok("삭제되었습니다");
	}

	
	
}

	