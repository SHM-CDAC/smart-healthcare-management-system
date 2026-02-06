package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DoctorResponseDTO;
import com.app.dto.DoctorSearchDTO;
import com.app.dto.FeedbackResponseDTO;
import com.app.service.CommonService;

@CrossOrigin
@RestController
@RequestMapping("/api/public")
public class CommonController {
	
	@Autowired
	private CommonService commonService;
	
	@PostMapping("/doctors")
	public ResponseEntity<?> fetchDoctorsByCityAndSpeciality(@RequestBody DoctorSearchDTO dto){
		List<DoctorResponseDTO> responseDto = commonService.getDoctorsByCityAndSpeciality(dto);
		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/doctor/feedbacks")
	public ResponseEntity<?> fetchDoctorFeedbacks(){
		List<FeedbackResponseDTO> dto = commonService.getDoctorFeedback();
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/patient/feedbacks")
	public ResponseEntity<?> fetchPatientFeedbacks(){
		List<FeedbackResponseDTO> dto = commonService.getPatientFeedback();
		return ResponseEntity.ok(dto);
	}
}
