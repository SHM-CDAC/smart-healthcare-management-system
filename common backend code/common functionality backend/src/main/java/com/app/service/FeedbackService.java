package com.app.service;

import java.util.List;

import com.app.dto.FeedbackRequestDTO;
import com.app.dto.FeedbackResponseDTO;

public interface FeedbackService {
	
	public String addFeedbackForApp(int id, FeedbackRequestDTO dto);
	
	public List<FeedbackResponseDTO> getAllFeedbacks();
}
