package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.customExc.ImageProcessingException;
import com.app.customExc.ResourceNotFoundException;
import com.app.dao.BookingRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.PatientRepository;
import com.app.dao.SlotRepository;
import com.app.dao.UserRepository;
import com.app.dto.DoctorResponseDTO;
import com.app.dto.PatientResponseDTO;
import com.app.pojos.AppointmentBooking;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.BookingStatus;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.SlotStatus;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    private final AuthServiceImpl authServiceImpl;

    @Autowired
    private SlotRepository slotRepo;
    
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BookingRepository bookingRepo;

    AdminServiceImpl(AuthServiceImpl authServiceImpl) {
        this.authServiceImpl = authServiceImpl;
    }
	
	@Override
	public List<PatientResponseDTO> getPatients() {
		List<Patient> patients = patientRepo.findAll();
		List<PatientResponseDTO> patientList = new ArrayList<>();
		for(Patient p:patients) {
			patientList.add(new PatientResponseDTO(p.getUserId().getIsActive(),p.getUserId().getStatus(),p.getId(),p.getFirstName()+" "+p.getLastName(), 
					p.getCity(), p.getAddress(), p.getGender(), 
					p.getMobileNo(), p.getDob(), 
					p.getUserId().getEmail(), "/patient/photo/"+p.getUserId().getId()
					));
		}
		
		return patientList;
	}

	@Override
	public List<DoctorResponseDTO> getDoctors() {
		List<Doctor> doctors = doctorRepo.findAll();
		List<DoctorResponseDTO> doctorList = new ArrayList<>();
		for(Doctor d:doctors) {
			//double fee,String clinicName,int userId
			doctorList.add(new DoctorResponseDTO(d.getUserId().getIsActive(),d.getFee(),d.getClinicName(),d.getUserId().getId(),d.getId(),d.getFirstName()+" "+d.getLastName(), 
					d.getCity(), d.getClinicAddress(), d.getMobileNo(), 
					d.getGender(), d.getDegree(), d.getSpecialization(), 
					d.getExperience(), "/doctor/photo/"+d.getUserId().getId(), 
					d.getDob(), d.getUserId().getEmail(),d.getUserId().getStatus(),
					"/doctor/certificate/"+d.getUserId().getId()
					));
		}
		return doctorList;
	}

	@Override
	public List<DoctorResponseDTO> getListOfUnverifiedDoctors() {
		List<Doctor> doctors = doctorRepo.findAll();
		List<DoctorResponseDTO> doctorList = new ArrayList<>();
		for(Doctor d:doctors) {
			if(d.getUserId().getStatus() == UserStatus.UNVERIFIED)
			{
				doctorList.add(new DoctorResponseDTO(d.getUserId().getIsActive(),d.getFee(),d.getClinicName(),d.getUserId().getId(),d.getId(),d.getFirstName()+" "+d.getLastName(), 
						d.getCity(), d.getClinicAddress(), d.getMobileNo(), 
						d.getGender(), d.getDegree(), d.getSpecialization(), 
						d.getExperience(), "/doctor/photo/"+d.getUserId().getId(), 
						d.getDob(), d.getUserId().getEmail(),d.getUserId().getStatus(),
						"/doctor/certificate/"+d.getUserId().getId()
						));
			}
			
		}
		return doctorList;
	}

	@Override
	public String doctorVerification(int doctorId) {
		Doctor d = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		User user = userRepo.findById(d.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!"));
		user.setStatus(UserStatus.VERIFIED);
		userRepo.save(user);
		return "Doctor Verified Successfuly";
	}

	@Override
	public String blockDoctorAcc(int doctorId)  {
		Doctor d = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		User user = userRepo.findById(d.getUserId().getId()).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!"));
		user.setStatus(UserStatus.BLOCKED);
		userRepo.save(user);
		List<AppointmentSlot> apmtSlots = slotRepo.findByDoctor(d);
		for(AppointmentSlot slot:apmtSlots) {
			slot.setStatus(SlotStatus.REMOVED);
			slotRepo.save(slot);
		}
			
		List<AppointmentBooking> bookings = bookingRepo.findByDoctor(d);
		
		for(AppointmentBooking booking:bookings) {
			booking.setStatus(BookingStatus.CANCELLED_BY_DOCTOR);
			bookingRepo.save(booking);
		}	
		return "Doctor Account Blocked Successfuly!!!";
	}

	@Override
	public List<DoctorResponseDTO> findDoctorsWithBookings() {
		List<Doctor> doctorList = bookingRepo.findDoctorsWithAtleastOneBooking();
		List<DoctorResponseDTO> dtoList = new ArrayList<>();
		for(Doctor d:doctorList) {
			User u = d.getUserId();
			dtoList.add(new DoctorResponseDTO(d.getUserId().getIsActive(),d.getFee(),d.getClinicName(),d.getUserId().getId(),d.getId(),d.getFirstName()+" "+d.getLastName() , 
					d.getCity(), d.getClinicAddress(), d.getMobileNo(), 
					d.getGender(), d.getDegree(), d.getSpecialization(), 
					d.getExperience(), "/doctor/photo/"+u.getId(), 
					d.getDob(), u.getEmail(), 
					u.getStatus(), 
					"/doctor/certificate/"+u.getId()
					));
		}
		return dtoList;
	}

	@Override
	public ResponseEntity<byte[]> getAdminImg() {
		
		Path imgPath = Paths.get("uploads/admin", "default.png");
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
	public User updateProfile(String email) {
		User u = userRepo.findByRole(UserRole.ROLE_ADMIN);
		u.setEmail(email);
		return u;
	}

	@Override
	public String blockPatientAcc(int patientId) {
		Patient patient = patientRepo.findById(patientId).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!"));
		User user = patient.getUserId();
		user.setStatus(UserStatus.BLOCKED);
		return "Patient Account Blocked Successfuly!!!";
	}

	@Override
	public User findAdminDetails(int userId) {
		User user = userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not Found!"));
		return user;
	}

	

}
