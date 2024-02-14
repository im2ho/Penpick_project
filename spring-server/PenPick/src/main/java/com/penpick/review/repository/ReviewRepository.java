package com.penpick.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.penpick.review.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

	// 마이 페이지 에서 나의 모든 리뷰 확인
	List<Review> findByReviewId(Long id);

	//  
	List<Review> findByPensionsId(Long id);
	
	
}
