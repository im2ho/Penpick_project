package com.penpick.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.penpick.review.model.Review;
import com.penpick.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	@Autowired
	private final ReviewRepository reviewRepository;
	
	// 모든 리뷰 조회
	public List<Review> getAllReview(){
		return reviewRepository.findAll();
	}
	
	// 한 유저의 모든 리뷰 조회
	public List<Review> getMyReview( Long id){ 
		return reviewRepository.findByReviewId(id);
	}
	
	// 상세 페이지 id에 해당하는 모든 리뷰 조회
	public List<Review> findByPensionsId(Long id){
		
		System.out.println("난 서비스야");
		return reviewRepository.findByPensionsId(id);
	}
	
	
	// 리뷰 작성
//	public void addReview(Review review) {
//		Review reviewdto = Review.builder()
//                .PenpickUser(review.getPenpickUser())
//                .reservation(review.getReservation())
//                .reviewText(review.getReviewText())
//                .build();
//		reviewRepository.save(reviewdto);
//	}
	
	
//	public void addReview(@RequestBody Review review) {
//		reviewRepository.save(review);
//	}
//	
	
	// 유저번호 넣기
	public void addReview(Review review) {
		reviewRepository.save(review);
	}
	
	

}
