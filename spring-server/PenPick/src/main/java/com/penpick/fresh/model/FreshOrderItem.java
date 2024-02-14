package com.penpick.fresh.model;

import com.penpick.reservation.model.Reservation;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class FreshOrderItem {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="fresh_orderItem_seq")
	@SequenceGenerator(name = "fresh_orderItem_seq", sequenceName="fresh_orderItem_seq",allocationSize=1)
	private long fresh_orderitem_num;
	
 
	@ManyToOne(fetch = FetchType.EAGER)
	private Reservation resnum;
	
	private int itemnum; // 주문 상품 번호
    private String itemName; // 주문 상품 이름
    private int itemPrice; // 주문 상품 가격
    private int itemCount; // 주문 상품 수량
    private int item_Total_Price; // 가격*수량
    

   
}