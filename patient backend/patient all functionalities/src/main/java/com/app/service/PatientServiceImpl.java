package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customExc.ImageProcessingException;
import com.app.customExc.ResourceNotFoundException;
import com.app.dao.BookingRepository;
import com.app.dao.PatientRepository;
import com.app.dao.SlotRepository;
import com.app.dao.UserRepository;
import com.app.dto.PatientLoginResponseDTO;
import com.app.dto.PatientProfileUpdationDTO;
import com.app.dto.PatientRegistrationDTO;
import com.app.pojos.AppointmentBooking;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.BookingStatus;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.SlotStatus;
import com.app.pojos.User;
import com.app.pojos.UserRole;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PatientServiceImpl implements PatientService{

	@Autowired
	private FileStorageService fileService;
	
	@Autowired 
	private UserRepository userRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private BookingRepository bookingRepo;

	@Autowired
	private SlotRepository slotRepo;
	
	@Override
	public Patient addPatientIntoDB(PatientRegistrationDTO patientRegDto, MultipartFile photo, User user){
		
				//getting the patient details from dto and setting the properties of Patient pojo
				Patient p = new Patient();
				p.setFirstName(patientRegDto.getFirstName());
				p.setLastName(patientRegDto.getLastName());
				p.setCity(patientRegDto.getCity());
				p.setAddress(patientRegDto.getAddress());
				p.setGender(patientRegDto.getGender());
				p.setMobileNo(patientRegDto.getMobileNo());
				p.setDob(patientRegDto.getDob());
				p.setUserId(user);
				
				String uploadDir = "uploads/patients/";
				try {
					String photoName = fileService.storeFiles(photo, uploadDir);
					
					p.setPhoto(photoName);
					
					return patientRepo.save(p);// saving the patient into DB
				}
				catch(IOException ex) {
					throw new ImageProcessingException(ex.getMessage());
				}
				
	}
	
	public Patient getPatientDetails(int id) {
		User u = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!!"));
		Patient p = patientRepo.findByUserId(u);
		if(p == null)
			throw new ResourceNotFoundException("Patient Not Found!!!");
		
		return p;
	}
	
	@Override
	public ResponseEntity<byte[]> getPatientPhoto(int userId)  {
		Patient patient = getPatientDetails(userId);
		String photoName = patient.getPhoto();
		
		Path imgPath = Paths.get("uploads/patients", photoName);
		try {
			byte[] bytes = Files.readAllBytes(imgPath);
			
			String contentType = Files.probeContentType(imgPath);

		    return ResponseEntity.ok()
		            .contentType(MediaType.parseMediaType(contentType))
		            .body(bytes);
		}
		catch(IOException ex) {
			throw new ImageProcessingException(ex.getMessage());
		}
		
	}

	@Override
	public PatientProfileUpdationDTO updatePatientDetails(int patientId, MultipartFile photo, PatientProfileUpdationDTO dto) {
		Patient patient = patientRepo.findById(patientId).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!!"));
		User user = userRepo.findById(patient.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!!"));
		user.setEmail(dto.getEmail());
		patient.setFirstName(dto.getFirstName());
		patient.setLastName(dto.getLastName());
		patient.setCity(dto.getCity());
		patient.setAddress(dto.getAddress());
		patient.setMobileNo(dto.getMobileNo());
		patient.setDob(dto.getDob());
		
		try {
			if(photo != null && !photo.isEmpty()) {
				String uploadDir = "uploads/patients/";
				String fileName = fileService.storeFiles(photo, uploadDir);
				patient.setPhoto(fileName);
			}
			
			userRepo.save(user);
			Patient p = patientRepo.save(patient);
			PatientProfileUpdationDTO profileDto  = new PatientProfileUpdationDTO();
			profileDto.setPatientId(p.getId());
			profileDto.setUserId(p.getUserId().getId());
			profileDto.setRole(p.getUserId().getRole());
			profileDto.setStatus(p.getUserId().getStatus());
			profileDto.setEmail(p.getUserId().getEmail());
			profileDto.setFirstName(p.getFirstName());
			profileDto.setLastName(p.getLastName());
			profileDto.setCity(p.getCity());
			profileDto.setAddress(p.getAddress());
			profileDto.setGender(p.getGender());
			profileDto.setMobileNo(p.getMobileNo());
			profileDto.setDob(p.getDob());
			profileDto.setPhotoUrl("/patient/photo/"+p.getUserId().getId());
			return profileDto;
		}
		catch(IOException ex) {
			throw new ImageProcessingException(ex.getMessage());
		}
		
	}


	@Override
	public String deactivateMyAccount(int patientId) {
		Patient patient = patientRepo.findById(patientId).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!!"));
		User user = userRepo.findById(patient.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!!"));
		user.setIsActive(false);
		userRepo.save(user);
		List<AppointmentBooking> bookings = bookingRepo.findByPatient(patient);
		for(AppointmentBooking booking:bookings) {
			booking.setStatus(BookingStatus.CANCELLED_BY_PATIENT);
			bookingRepo.save(booking);
			AppointmentSlot slot = slotRepo.findById(booking.getSlot().getId()).orElseThrow(()-> new ResourceNotFoundException("Slot Not Found!!!"));
			slot.setStatus(SlotStatus.VACANT);
			slotRepo.save(slot);
			
		}
		return "Account Deleted Successfuly!!!";
		
		
	}

	@Override
	public PatientLoginResponseDTO findPatientDetails(int userId) {
		Patient p = patientRepo.findByUserIdId(userId);
		User user = p.getUserId();
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
