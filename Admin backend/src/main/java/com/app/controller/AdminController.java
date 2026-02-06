package com.app.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdminUpdateProfileDTO;
import com.app.dto.DoctorResponseDTO;
import com.app.dto.JwtDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.dto.PatientResponseDTO;
import com.app.pojos.User;
import com.app.service.AdminService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/photo/{userId}")
	public ResponseEntity<byte[]> getAdminPhoto(){
		return adminService.getAdminImg();
	}
	
	@GetMapping("/patients")
	public ResponseEntity<?> getPatientsRegisteredOnWebsite(){
		List<PatientResponseDTO> responseDto = adminService.getPatients();
		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/doctors")
	public ResponseEntity<?> getDoctorsRegisteredOnWebsite(){
		List<DoctorResponseDTO> doctorList = adminService.getDoctors();
		return ResponseEntity.ok(doctorList);
	}
	
	@GetMapping("/doctors/unverified")
	public ResponseEntity<?> getUnverifiedDoctors(){
		List<DoctorResponseDTO> doctorList = adminService.getListOfUnverifiedDoctors();
		return ResponseEntity.ok(doctorList);
		
	}
	
	@PostMapping("/doctor/verify/{doctorId}")
	public ResponseEntity<?> verifyDoctors(@PathVariable int doctorId) {
		String response = adminService.doctorVerification(doctorId);
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/doctor/{doctorId}/block")
	public ResponseEntity<?> blockDoctorAccount(@PathVariable int doctorId) {
		String response = adminService.blockDoctorAcc(doctorId);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/doctors/with-bookings")
	public ResponseEntity<?> getDoctorsHavingAtLeastOneBooking(){
		List<DoctorResponseDTO> response = adminService.findDoctorsWithBookings();
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> updateAdminProfile(@RequestBody AdminUpdateProfileDTO dto){
		User user = adminService.updateProfile(dto.getEmail());
		return ResponseEntity.ok(user);
	}
	
	@PatchMapping("/patient/{patientId}/block")
	public ResponseEntity<?> blockPatientAccount(@PathVariable int patientId) {
		String response = adminService.blockPatientAcc(patientId);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getLoggedInAdminDetails(@AuthenticationPrincipal JwtDTO jwtDto){
		
		User admin = adminService.findAdminDetails(jwtDto.getUserId());
		return ResponseEntity.ok(admin);
	}
	
	
//	public ResponseEntity<?> getCountOfPatientsBookedSlotForDoctor(){
//		return null;
//	}
	
}
