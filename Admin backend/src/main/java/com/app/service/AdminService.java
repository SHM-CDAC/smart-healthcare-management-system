package com.app.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.dto.DoctorResponseDTO;
import com.app.dto.PatientResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;

public interface AdminService {
	
	public List<PatientResponseDTO> getPatients();
	
	public List<DoctorResponseDTO> getDoctors();
	
	public List<DoctorResponseDTO> getListOfUnverifiedDoctors();
	
	public String doctorVerification(int doctorId) ;
	
	public String blockDoctorAcc(int doctorId);
	
	public List<DoctorResponseDTO> findDoctorsWithBookings();
	
	public ResponseEntity<byte[]> getAdminImg();
	
	public User updateProfile(String email);
	
	public String blockPatientAcc(int patientId);
	
	public User findAdminDetails(int userId);
	
}
