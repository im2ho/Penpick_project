package com.penpick.review.model;



import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.penpick.pension.model.Pensions;
import com.penpick.reservation.model.Reservation;
import com.penpick.users.model.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Review {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="review_add_seq")
	@SequenceGenerator(name="review_add_seq", sequenceName="review_add_seq", allocationSize=1)
    private Long reviewId;
	
	@OneToOne(fetch = FetchType.LAZY) // , cascade = CascadeType.ALL 빼고 진행 테스트
	private Reservation reservation;

	@ManyToOne(fetch = FetchType.EAGER)
	private Users penpickUser;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Pensions pensions;
	
	private String nickName;
	
	private String reviewText;
	
	@CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date reviewCreateDate;
	
	 @PrePersist
	    public void prePersist() {
	        this.reviewCreateDate = new Date();
	    }
	
	private Date checkInDay;
	
	private Date checkOutDay;
	
	
	
//	@Builder
//	public Review(Long reviewId, Reservation reservation, Users PenpickUser,  String nickName, String reviewText,
//			Date reviewCreateDate, Date checkInDay, Date checkOutDay) {
//		
//		
//		this.reviewId = reviewId;
//		this.PenpickUser = PenpickUser;
//		this.reservation = reservation;
//		this.reviewText = reviewText;
//		this.nickName = nickName;
//		this.reviewCreateDate = reviewCreateDate;
//		this.checkInDay = checkInDay;
//		this.checkOutDay = checkOutDay;
//	}
//	 
	
	
	
	
	
}
