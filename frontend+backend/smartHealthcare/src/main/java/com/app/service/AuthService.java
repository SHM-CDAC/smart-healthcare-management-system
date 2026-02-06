package com.app.service;

import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;

public interface AuthService {
	public DoctorLoginResponseDTO getDoctorLoginResponseDto(User user,Doctor d) ;
	public PatientLoginResponseDTO getPatientLoginResponseDto(User user,Patient p) ;
}
