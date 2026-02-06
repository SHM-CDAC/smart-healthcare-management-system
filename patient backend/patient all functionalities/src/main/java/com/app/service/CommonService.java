package com.app.service;

import java.util.List;

import com.app.dto.DoctorResponseDTO;
import com.app.dto.DoctorSearchDTO;
import com.app.dto.FeedbackResponseDTO;

public interface CommonService {

	public List<DoctorResponseDTO> getDoctorsByCityAndSpeciality(DoctorSearchDTO dto);
	
	public List<FeedbackResponseDTO> getDoctorFeedback();
	
	public List<FeedbackResponseDTO> getPatientFeedback();
} 
