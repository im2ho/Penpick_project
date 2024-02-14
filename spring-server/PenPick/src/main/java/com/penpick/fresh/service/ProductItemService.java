package com.penpick.fresh.service;

import java.io.IOException;
import java.sql.Blob;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.penpick.fresh.model.ProductItem;
import com.penpick.fresh.repository.ProductItemRepository;

@Service
public class ProductItemService {
    @Autowired
    private ProductItemRepository productItemRepository; 

    public List<ProductItem> getAllProducts() {
        return productItemRepository.findAll();
    }

    public Optional<ProductItem> getProduct(Long item_num) {
        return productItemRepository.findById(item_num);
    }

    // 이미지 파일을 업로드하여 상품 등록
    
}