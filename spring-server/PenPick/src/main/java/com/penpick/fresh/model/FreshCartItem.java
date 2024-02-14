package com.penpick.fresh.model;

import com.penpick.reservation.model.Reservation;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class FreshCartItem {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="fresh_cartItem_seq")
	@SequenceGenerator(name = "fresh_cartItem_seq", sequenceName="fresh_cartItem_seq",allocationSize=1)
	private long fresh_cartitem_num;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="res_num")
    private Reservation res_num;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="item_num")
    private ProductItem item;
	
	private int item_count;
	
	public static FreshCartItem createCartItem(Reservation res_num, ProductItem item, int amount) {
		FreshCartItem cartItem = new FreshCartItem();
        cartItem.setRes_num(res_num);
        cartItem.setItem(item);
        cartItem.setItem_count(amount);
        return cartItem;
    }
	
	 // 이미 담겨있는 물건 또 담을 경우 수량 증가
    public void addCount(int count) {
        this.item_count += count;
    }

	
}
