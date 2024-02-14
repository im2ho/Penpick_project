package com.penpick.fresh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.fresh.model.FreshCartItem;
import com.penpick.fresh.repository.FreshCartItemRepository;

@Service
public class FreshCartItemService {
	
	@Autowired
	private FreshCartItemRepository freshcartitemRepository;
	
	public List<FreshCartItem> getAllFreshCartItem() {
		return freshcartitemRepository.findAll();
	}
	
	public Optional<FreshCartItem> getCartItems(Long res_num) {
		return freshcartitemRepository.findById(res_num);
	}
	
	public void saveFreshCartItem(FreshCartItem freshcartitem) {
		freshcartitemRepository.save(freshcartitem);
	}
	
	public void deleteFreshCartItem(FreshCartItem freshcartitem) {
		freshcartitemRepository.delete(freshcartitem);
	}
	
	public void deleteAllFreshCartItem(FreshCartItem freshcartitem) {
		freshcartitemRepository.deleteAll();
	}
	
}

