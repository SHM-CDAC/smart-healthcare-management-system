package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DoctorReviewResponseDTO;
import com.app.dto.ReviewCreationDTO;
import com.app.pojos.Review;
import com.app.service.ReviewService;

@CrossOrigin
@RestController
@RequestMapping("/review")
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	@PostMapping("/create")
	public ResponseEntity<?> makeAReview(@RequestBody ReviewCreationDTO dto) {
		String response = reviewService.addReview(dto);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public ResponseEntity<?> getDoctorReviews(@PathVariable int doctorId) {
		List<DoctorReviewResponseDTO> response = reviewService.getMyReviews(doctorId);
		return ResponseEntity.ok(response);
	}
}
