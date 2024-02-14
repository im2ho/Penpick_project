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
import org.springframework.web.bind.annotation.RestController;

import com.penpick.fresh.model.FreshCartItem;
import com.penpick.fresh.service.FreshCartItemService;

@RestController
@RequestMapping("/freshCart")

public class FreshCartItemController {
	@Autowired
	private FreshCartItemService freshcartitemService;
	
	@GetMapping
	public String freshCartItemList() {
		return "redirect:/freshcartitem.list";
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<FreshCartItem>> getAllFreshCartItem() {
		List<FreshCartItem> freshcartitemList = null;
		try {
			freshcartitemList = freshcartitemService.getAllFreshCartItem();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(freshcartitemList);
	}
	
	@GetMapping("/{res_num}")
	public ResponseEntity<Optional<FreshCartItem>> getFreshCartItem(@PathVariable Long res_num){
		Optional<FreshCartItem> freshcartitem = freshcartitemService.getCartItems(res_num);
		
		if(freshcartitem.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return ResponseEntity.ok(freshcartitem);
		}
	}
	
	@PostMapping("/add")
	public ResponseEntity<Void> registerFreshCartItem(@RequestBody FreshCartItem freshcartitem){
		freshcartitemService.saveFreshCartItem(freshcartitem);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{item_num}")
	public ResponseEntity<String> deleteFreshCartItem(@PathVariable FreshCartItem freshcartitem){
		freshcartitemService.deleteFreshCartItem(freshcartitem);
		return ResponseEntity.ok("삭제되었습니다");
	}
	

}
