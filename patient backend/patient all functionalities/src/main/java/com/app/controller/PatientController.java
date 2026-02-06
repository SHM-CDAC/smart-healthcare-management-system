package com.app.controller;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ChangePasswordDTO;
import com.app.dto.JwtDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.dto.PatientProfileUpdationDTO;
import com.app.security.UserPrincipal;
import com.app.service.PatientService;

@CrossOrigin
@RestController
@RequestMapping("/patient")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@GetMapping("/photo/{id}")
	public ResponseEntity<?> getPatientImg(@PathVariable int id) {
		
			return patientService.getPatientPhoto(id);		
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePatientDetails(@PathVariable("id") int patientId, @RequestPart(value ="photo", required = false) MultipartFile photo, 
			@RequestPart("dto") PatientProfileUpdationDTO dto){
			return ResponseEntity.ok(patientService.updatePatientDetails(patientId, photo, dto));	
	}
	
	
	@DeleteMapping("/delete/{patientId}")
	public ResponseEntity<?> deactivateAccount(@PathVariable int patientId) {
		String response = patientService.deactivateMyAccount(patientId);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getLoggedInPatientDetails(@AuthenticationPrincipal JwtDTO jwtDto){
		System.out.println("----inside patient controller");
		PatientLoginResponseDTO dto = patientService.findPatientDetails(jwtDto.getUserId());
		return ResponseEntity.ok(dto);
	}
	
}
