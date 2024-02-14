package com.penpick.review.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.review.model.Review;
import com.penpick.review.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private final ReviewService reviewService;
	
	// 상세페이지 모든 리뷰 보기
	@GetMapping("/list")
	public ResponseEntity<List<Review>> getDetailPensionAllReview() {
		List<Review> review = reviewService.getAllReview();
        return ResponseEntity.ok(review);
    }
	
	// 마이 페이지 나의 전체 리뷰 보기
	@GetMapping("/myList")
	public List<Review> getMyAllReview(Long id){
		List<Review> myReview = reviewService.getMyReview(id);
		return myReview;
	}
	
	// 상세 페이지 리뷰 조회
	@GetMapping("/detailReview")
	public ResponseEntity<List<Review>> findByPensionsId(@RequestParam("pensionsId") Long id){
		System.out.println(id);
		List<Review> detailReview = reviewService.findByPensionsId(id);
		System.out.println("나 되고있냐?");
		return ResponseEntity.ok(detailReview);
	}
	
	// 리뷰 작성
//	@PostMapping("/add")
//	public ResponseEntity<Void> addReview(@RequestBody Review review) {
//		System.out.println(review);
//	    reviewService.addReview(review);
//	    return ResponseEntity.status(HttpStatus.CREATED).build();
//	}
	
//	// 리뷰 작성
//	@PostMapping("/add")
//	public void addReview(@RequestBody Review review) {
//		System.out.println(review);
//	    reviewService.addReview(review);
//	    
//	}
	
	@PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return new ResponseEntity<>("리뷰가 성공적으로 추가되었습니다.", HttpStatus.OK);
    }
	
}	
