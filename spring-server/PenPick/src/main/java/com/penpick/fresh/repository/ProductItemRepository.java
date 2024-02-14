package com.penpick.fresh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.fresh.model.ProductItem;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long>{

}
