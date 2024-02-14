package com.penpick.fresh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.penpick.fresh.model.FreshOrderItem;
import com.penpick.reservation.model.Reservation;

public interface FreshOrderItemRepository extends JpaRepository<FreshOrderItem, Long>{
	@Query("SELECT f FROM FreshOrderItem f WHERE f.resnum.id = :resnum")
	List<FreshOrderItem> findFreshOrderItemByReservationId(@Param("resnum") Long resnum);
}
