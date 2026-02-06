package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.PatientLoginResponseDTO;
import com.app.dto.PatientProfileUpdationDTO;
import com.app.dto.PatientRegistrationDTO;
import com.app.pojos.Patient;
import com.app.pojos.User;

public interface PatientService {
	
	public Patient addPatientIntoDB(PatientRegistrationDTO patientRegDto, MultipartFile photo, User u) ;
	public Patient getPatientDetails(int id) ;
	public ResponseEntity<byte[]> getPatientPhoto(int userId) ;
	public PatientProfileUpdationDTO updatePatientDetails(int patientId, MultipartFile photo, PatientProfileUpdationDTO dto) ;
	public String deactivateMyAccount(int patientId) ;
	public PatientLoginResponseDTO findPatientDetails(int userId);
}
