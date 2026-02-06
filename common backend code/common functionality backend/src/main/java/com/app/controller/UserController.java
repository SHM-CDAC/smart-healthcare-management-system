package com.app.controller;
import java.io.IOException;
import com.app.security.JwtUtils;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.customExc.UserAlreadyExistsException;
import com.app.dao.DoctorRepository;
import com.app.dao.PatientRepository;
import com.app.dto.AuthResp;
import com.app.dto.ChangePasswordDTO;
import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.DoctorRegistrationDTO;
import com.app.dto.LoginRequestDTO;
import com.app.dto.PatientLoginResponseDTO;
import com.app.dto.PatientRegistrationDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;
import com.app.security.UserPrincipal;
import com.app.service.AuthService;
import com.app.service.DoctorService;
import com.app.service.FileStorageService;
import com.app.service.PatientService;
import com.app.service.UserService;

import jakarta.validation.Valid;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserService userService;
	
	@Autowired 
	private PatientService patientService;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private AuthService authService;
	
	
	@PostMapping(value = "/patient/register",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> addPatient(@Valid @RequestPart("patientRegDto") PatientRegistrationDTO patientRegDto,
										@RequestPart(value = "photo" , required = false) MultipartFile photo) {
		
		Boolean res = userService.checkIfUserExists(patientRegDto.getEmail());
		if(res != true) {
			//getting the user details from dto and setting the properties of User pojo
			User u = new User();
			u.setEmail(patientRegDto.getEmail());
			u.setPassword(passwordEncoder.encode(patientRegDto.getPassword()));
			u.setRole(UserRole.ROLE_PATIENT);
			u.setStatus(UserStatus.VERIFIED);
			User user = userService.addUserIntoDB(u); // User pojo saved here...
			Patient p = patientService.addPatientIntoDB(patientRegDto, photo, user);
			return ResponseEntity.ok(p);
		}
		else
			throw new UserAlreadyExistsException("User already exists with this email!");
					
		
	}
	
	@PostMapping(value="/doctor/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> addDoctor(@Valid @RequestPart("doctorRegDto") DoctorRegistrationDTO doctorRegDto,
			@RequestPart(value = "photo", required = false) MultipartFile photo, @RequestPart("certificate") MultipartFile certificate) {
		
		
		Boolean res = userService.checkIfUserExists(doctorRegDto.getEmail());
		if(res != true) {
			//getting the user details from dto and setting the properties of User pojo
			User u = new User();
			u.setEmail(doctorRegDto.getEmail());
			u.setPassword(passwordEncoder.encode(doctorRegDto.getPassword()));
			u.setRole(UserRole.ROLE_DOCTOR);
			u.setStatus(UserStatus.UNVERIFIED);
			User user = userService.addUserIntoDB(u);
			Doctor d = doctorService.addDoctorIntoDB(doctorRegDto, photo, certificate, user);
			return ResponseEntity.ok(d);
		}
		else
			throw new UserAlreadyExistsException("User already exists with this email!");
		
	}
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> AuthenticateUser(@RequestBody LoginRequestDTO loginDto) {
		User user = userService.validateUser(loginDto.getEmail(), loginDto.getPassword());
		if(user.getRole() == UserRole.ROLE_DOCTOR) {
			Doctor d = doctorService.getDoctorDetails(user.getId());
//			Doctor d = docRepo.findByUserId(user);
			DoctorLoginResponseDTO docDto = authService.getDoctorLoginResponseDto(user,d);
			return ResponseEntity.ok(docDto);
		}
		 
		if(user.getRole() == UserRole.ROLE_PATIENT) {
			Patient p = patientService.getPatientDetails(user.getId());
//			Patient p = patientRepo.findByUserId(user);
			PatientLoginResponseDTO patientDto = authService.getPatientLoginResponseDto(user,p);
			return ResponseEntity.ok(patientDto);
		}
		
		return ResponseEntity.ok(user);
	}
	
	@PatchMapping("/changePwd")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO pwdDto) {
		String response = userService.changeUserPassword(pwdDto.getUserId(), pwdDto.getOldPassword(), pwdDto.getNewPassword());
		return ResponseEntity.ok(response);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<?> signIn(@RequestBody LoginRequestDTO dto){
		try {
			System.out.println("in user sign in "+dto);		
			/*1. Create Authentication object (UsernamePasswordAuthToken) 
			 * to store - email & password
			 */
			
			Authentication holder=new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
			System.out.println("---HOLDER: "+holder);
			System.out.println("---is authenticated: "+holder.isAuthenticated());
			//log.info("*****Before -  is authenticated {}",holder.isAuthenticated());//false
			/*
			 * Call AuthenticationMgr's authenticate method
			 */
			 Authentication fullyAuth = authenticationManager.authenticate(holder);
			 System.out.println("---FULLAUTH: "+fullyAuth);
			//=> authentication success -> create JWT 
			//log.info("*****After -  is authenticated {}",fullyAuth.isAuthenticated());//true
			//log.info("**** auth {} ",fullyAuth);//principal : user details , null : pwd , Collection<GrantedAuth>		
			//log.info("***** class of principal {}",fullyAuth.getPrincipal().getClass());//com.healthcare.security.UserPrincipal
			//downcast Object -> UserPrincipal
			 
			UserPrincipal principal=(UserPrincipal) fullyAuth.getPrincipal();
			System.out.println("---principal: "+principal);
				return ResponseEntity.ok(new AuthResp(jwtUtils.generateToken(principal),principal.getUserRole()));
		}
		catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		
	}
	
	@GetMapping("/pwd-encryption")
	public ResponseEntity<?> encryptUserPassword() {
		return ResponseEntity.ok(userService.encryptPasswords());

	}
}
