package com.penpick.fresh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.fresh.model.FreshCartItem;

public interface FreshCartItemRepository extends JpaRepository<FreshCartItem, Long>{

}
