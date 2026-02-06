package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ChangePasswordDTO;
import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.DoctorProfileUpdationDTO;
import com.app.dto.JwtDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.pojos.Doctor;
import com.app.service.DoctorService;

@CrossOrigin
@RestController
@RequestMapping("/doctor")
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;
	
	@GetMapping("/photo/{id}")
	public ResponseEntity<?> getDoctorImg(@PathVariable int id) {
		
			return doctorService.getDoctorPhoto(id);
	}
	
	@GetMapping("/certificate/{id}")
	public ResponseEntity<?> getDoctorCert(@PathVariable int id) {
		
		return doctorService.getDocCert(id);
	}
	
	@PostMapping("/update/{id}")
	public ResponseEntity<?> updateDoctorDetails(@RequestPart("profileDto") DoctorProfileUpdationDTO profileDto ,
			@RequestPart(value = "photo",required = false) MultipartFile photo, @RequestPart(value ="certificate",required = false) MultipartFile certificate,
			@PathVariable int id) {
			DoctorProfileUpdationDTO updatedDoctor = doctorService.updateDoctorData(profileDto, photo, certificate, id);
			return ResponseEntity.status(HttpStatus.OK).body(updatedDoctor);
	}
	
	
	@DeleteMapping("/delete/{doctorId}")
	public ResponseEntity<?> deactivateAccount(@PathVariable int doctorId) {
		String response = doctorService.deactivateMyAccount(doctorId);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getLoggedInDoctorDetails(@AuthenticationPrincipal JwtDTO jwtDto){
		DoctorLoginResponseDTO dto = doctorService.findDoctorDetails(jwtDto.getUserId());
		return ResponseEntity.ok(dto);
	}
	
}
