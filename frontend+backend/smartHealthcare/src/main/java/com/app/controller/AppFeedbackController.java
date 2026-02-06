package com.app.controller;

import java.sql.Time;
import java.time.LocalTime;
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

import com.app.dto.FeedbackRequestDTO;
import com.app.dto.FeedbackResponseDTO;
import com.app.service.FeedbackService;

@CrossOrigin
@RestController
@RequestMapping("/feedback")
public class AppFeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/add/{id}")
	public ResponseEntity<?> addFeedback(@PathVariable int id, @RequestBody FeedbackRequestDTO dto){
	
		String response = feedbackService.addFeedbackForApp(id, dto);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping
	public ResponseEntity<?> getAllApplicationFeedbacks(){
		List<FeedbackResponseDTO> response = feedbackService.getAllFeedbacks();
		return ResponseEntity.ok(response);
	}
}
