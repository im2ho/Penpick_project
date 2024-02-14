package com.penpick.reservation.model;



import java.util.Date;

import com.penpick.pension.model.Pensions;
import com.penpick.users.model.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Reservation {

	    @Id
	    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="perchase_seq")
		@SequenceGenerator(name="perchase_seq", sequenceName="perchase_seq", allocationSize=1)
	    private Long id;

	    @ManyToOne
	    private Users penpickUser;

	    @ManyToOne
	    private Pensions pensions;
	  
	    private String phoneNumber;
		private String roomType;
		private int people;
		private String payment;
		private int pay;
		
		
		@Temporal(TemporalType.DATE)
		private Date checkInDay;
		
		@Temporal(TemporalType.DATE)
		private Date checkOutDay;
		
		private String pick;
		private String pickTime;
		private String market;
	    
		public Reservation(Long id) {
	        this.id = id;
	    }
	    

	}