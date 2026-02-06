package com.app.service;

import java.util.List;

import com.app.dto.DoctorReviewResponseDTO;
import com.app.dto.ReviewCreationDTO;
import com.app.pojos.Review;

public interface ReviewService {
	public String addReview(ReviewCreationDTO dto) ;
	public List<DoctorReviewResponseDTO> getMyReviews(int doctorId);
}
