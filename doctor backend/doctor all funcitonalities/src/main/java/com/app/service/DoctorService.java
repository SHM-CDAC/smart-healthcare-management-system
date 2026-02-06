package com.app.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.DoctorProfileUpdationDTO;
import com.app.dto.DoctorRegistrationDTO;
import com.app.pojos.Doctor;
import com.app.pojos.*;

public interface DoctorService {
	public Doctor addDoctorIntoDB(DoctorRegistrationDTO doctorRegDto,MultipartFile photo,
			MultipartFile certificate,User user);
	
	public Doctor getDoctorDetails(int id) ;
	
	public ResponseEntity<byte[]> getDoctorPhoto(int id) ;
	public ResponseEntity<byte[]> getDocCert(int id);
	
	public DoctorProfileUpdationDTO updateDoctorData(DoctorProfileUpdationDTO dto, MultipartFile photo, MultipartFile certificate, int doctorId) ;
	
	public DoctorLoginResponseDTO findDoctorDetails(int doctorId);
	
	public String deactivateMyAccount(int doctorId) ;
}
