package com.penpick.fresh.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.penpick.fresh.model.ProductItem;
import com.penpick.fresh.service.ProductItemService;

@RestController
@RequestMapping("/productItem")

public class ProductItemController {
	
	@Autowired
	private ProductItemService productitemService;
	
	public ProductItemController(ProductItemService productitemService) {
        this.productitemService = productitemService;
    }
	
	@GetMapping
	public String ProductItemList() {
		return "redirect:/productitem.list";
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<ProductItem>> getAllProductItem() {
		List<ProductItem> productList = null;
		try {
			productList = productitemService.getAllProducts();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(productList);
	}
	
	
}