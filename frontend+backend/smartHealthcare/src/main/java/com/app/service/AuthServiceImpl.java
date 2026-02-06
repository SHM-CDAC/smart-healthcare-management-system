package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
	
	@Override
	public DoctorLoginResponseDTO getDoctorLoginResponseDto(User user,Doctor d)  {
		
		DoctorLoginResponseDTO resDTO = new DoctorLoginResponseDTO();
		resDTO.setUserId(user.getId());
		resDTO.setEmail(user.getEmail());
		resDTO.setRole(user.getRole());
		resDTO.setStatus(user.getStatus());
		resDTO.setDoctorId(d.getId());
		resDTO.setFirstName(d.getFirstName());
		resDTO.setLastName(d.getLastName());
		resDTO.setGender(d.getGender());
		resDTO.setCity(d.getCity());
		resDTO.setClinicAddress(d.getClinicAddress());
		resDTO.setMobileNo(d.getMobileNo());
		resDTO.setDegree(d.getDegree());
		resDTO.setClinicName(d.getClinicName());
		resDTO.setSpecialization(d.getSpecialization());
		resDTO.setExperience(d.getExperience());
		resDTO.setFee(d.getFee());
		resDTO.setDob(d.getDob());
		resDTO.setPhotoUrl("/doctor/photo/"+user.getId());
		resDTO.setCertUrl("/doctor/certificate/"+user.getId());
		
		return resDTO;
	}

	@Override
	public PatientLoginResponseDTO getPatientLoginResponseDto(User user, Patient p)  {
		
		PatientLoginResponseDTO resDto = new PatientLoginResponseDTO();
		resDto.setUserId(user.getId());
		resDto.setEmail(user.getEmail());
		resDto.setRole(user.getRole());
		resDto.setStatus(user.getStatus());
		resDto.setPatientId(p.getId());
		resDto.setFirstName(p.getFirstName());
		resDto.setLastName(p.getLastName());
		resDto.setCity(p.getCity());
		resDto.setAddress(p.getAddress());
		resDto.setGender(p.getGender());
		resDto.setMobileNo(p.getMobileNo());
		resDto.setDob(p.getDob());
		resDto.setPhotoUrl("/patient/photo/"+user.getId());
		return resDto;
	}

}
