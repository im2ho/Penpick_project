package com.penpick.fresh.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class ProductItem {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="item_seq")
	@SequenceGenerator(name = "item_seq", sequenceName="item_seq",allocationSize=1)
	private long item_num;
	
	private String item_name;
	private int item_price;
	
	

}
