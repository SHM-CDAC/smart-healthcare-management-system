package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customExc.ImageProcessingException;
import com.app.customExc.ResourceNotFoundException;
import com.app.dao.BookingRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.SlotRepository;
import com.app.dao.UserRepository;
import com.app.dto.DoctorLoginResponseDTO;
import com.app.dto.DoctorProfileUpdationDTO;
import com.app.dto.DoctorRegistrationDTO;
import com.app.pojos.AppointmentBooking;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.BookingStatus;
import com.app.pojos.Doctor;
import com.app.pojos.SlotStatus;
import com.app.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {

	@Autowired
	private FileStorageService fileService;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private SlotRepository slotRepo;

	@Autowired
	private BookingRepository bookingRepo;
	
	@Override
	public Doctor addDoctorIntoDB(DoctorRegistrationDTO doctorRegDto, 
			MultipartFile photo, MultipartFile certificate,User user)  {
				
				//getting the doctor details from dto and setting the properties of Doctor pojo
				Doctor doctor = new Doctor();
				doctor.setFirstName(doctorRegDto.getFirstName());
				doctor.setLastName(doctorRegDto.getLastName());
				doctor.setGender(doctorRegDto.getGender());
				doctor.setCity(doctorRegDto.getCity());
				doctor.setClinicAddress(doctorRegDto.getClinicAddress());
				doctor.setMobileNo(doctorRegDto.getMobileNo());
				doctor.setDegree(doctorRegDto.getDegree());
				doctor.setClinicName(doctorRegDto.getClinicName());
				doctor.setSpecialization(doctorRegDto.getSpecialization());
				doctor.setExperience(doctorRegDto.getExperience());
				doctor.setFee(doctorRegDto.getFee());
				doctor.setDob(doctorRegDto.getDob());
				doctor.setUserId(user);
				
				String uploadDir = "uploads/doctors/";
				
				try {
					String photoName = fileService.storeFiles(photo, uploadDir);
					String certFileName = fileService.storeFiles(certificate, uploadDir);
				    
					doctor.setPhoto(photoName);
					doctor.setCertificate(certFileName);
					
					//saving doctor into db
					Doctor d = doctorRepo.save(doctor);
					return d;
				}
				catch(IOException ex) {
					throw new ImageProcessingException(ex.getMessage());
				}
				
				
	}

	@Override
	public Doctor getDoctorDetails(int userId) {
			User u = userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!"));
			Doctor d = doctorRepo.findByUserId(u);
			if(d == null)
				throw new ResourceNotFoundException("Doctor Not Found!!");
			
			return d;
	}

	@Override
	public ResponseEntity<byte[]> getDoctorPhoto(int userId) {
		Doctor doc = getDoctorDetails(userId);
		String photoName = doc.getPhoto();
		
		Path imgPath = Paths.get("uploads/doctors", photoName);
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
	public ResponseEntity<byte[]> getDocCert(int userId){
		Doctor doc = getDoctorDetails(userId);
		String certName = doc.getCertificate();
		
		Path imgPath = Paths.get("uploads/doctors", certName);
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
	public DoctorProfileUpdationDTO updateDoctorData(DoctorProfileUpdationDTO dto, MultipartFile photo, 
									MultipartFile certificate,int doctorId) {
		
			Doctor doctor = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor not found"));
			User user = userRepo.findById(doctor.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User not found"));
			user.setEmail(dto.getEmail());
			doctor.setFirstName(dto.getFirstName());
			doctor.setLastName(dto.getLastName());
			doctor.setCity(dto.getCity());
			doctor.setClinicAddress(dto.getClinicAddress());
			doctor.setClinicName(dto.getClinicName());
			doctor.setMobileNo(dto.getMobileNo());
			doctor.setGender(dto.getGender());
			doctor.setDegree(dto.getDegree());
			doctor.setSpecialization(dto.getSpecialization());
			doctor.setExperience(dto.getExperience());
			doctor.setFee(dto.getFee());
			doctor.setDob(dto.getDob());
			
			String uploadDir = "uploads/doctors/";
			try {
				if(photo != null && !photo.isEmpty()) {
					String photoName = fileService.storeFiles(photo, uploadDir);
					doctor.setPhoto(photoName);
				}
				if(certificate != null && !certificate.isEmpty()) {
					String certName = fileService.storeFiles(certificate, uploadDir);
					doctor.setCertificate(certName);
				}
				userRepo.save(user);
				
			Doctor d = doctorRepo.save(doctor);
			DoctorProfileUpdationDTO profileDto = new DoctorProfileUpdationDTO();
			profileDto.setDoctorId(d.getId());
			profileDto.setUserId(d.getUserId().getId());
			profileDto.setEmail(d.getUserId().getEmail());
			profileDto.setStatus(d.getUserId().getStatus());
			profileDto.setFirstName(d.getFirstName());
			profileDto.setLastName(d.getLastName());
			profileDto.setCity(d.getCity());
			profileDto.setClinicAddress(d.getClinicAddress());
			profileDto.setMobileNo(d.getMobileNo());
			profileDto.setGender(d.getGender());
			profileDto.setDegree(d.getDegree());
			profileDto.setClinicName(d.getClinicName());
			profileDto.setSpecialization(d.getSpecialization());
			profileDto.setExperience(d.getExperience());
			profileDto.setFee(d.getFee());
			profileDto.setDob(d.getDob());
			profileDto.setPhotoUrl("/doctor/photo/"+d.getUserId().getId());
			profileDto.setRole(d.getUserId().getRole());
			return profileDto;
			}
			catch(IOException ex) {
				throw new ImageProcessingException(ex.getMessage());
			}
			
			
	}


	@Override
	public String deactivateMyAccount(int doctorId) {
		String response = "Account Deleted Successfully!!!";
		Doctor doctor = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor not found"));
		User user = userRepo.findById(doctor.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User not found"));
		user.setIsActive(false);
		userRepo.save(user);
		List<AppointmentSlot> apmtSlots = slotRepo.findByDoctor(doctor);
		for(AppointmentSlot slot:apmtSlots) {
			slot.setStatus(SlotStatus.REMOVED);
			slotRepo.save(slot);
		}
			
		List<AppointmentBooking> bookings = bookingRepo.findByDoctor(doctor);
		
		for(AppointmentBooking booking:bookings) {
			booking.setStatus(BookingStatus.CANCELLED_BY_DOCTOR);
			bookingRepo.save(booking);
		}	
	
		return response;
	}

	@Override
	public DoctorLoginResponseDTO findDoctorDetails(int doctorId) {
		Doctor d = doctorRepo.findByUserIdId(doctorId);
		User user = d.getUserId();
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
	
	

}
