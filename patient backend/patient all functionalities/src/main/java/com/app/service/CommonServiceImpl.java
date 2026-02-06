package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.DoctorRepository;
import com.app.dao.FeedbackRepository;
import com.app.dao.PatientRepository;
import com.app.dto.DoctorResponseDTO;
import com.app.dto.DoctorSearchDTO;
import com.app.dto.FeedbackResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Feedback;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserGender;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CommonServiceImpl implements CommonService{

	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private FeedbackRepository feedbackRepo;

	@Autowired
	private PatientRepository patientRepo;
	
	@Override
	public List<DoctorResponseDTO> getDoctorsByCityAndSpeciality(DoctorSearchDTO dto) {
		List<Doctor> doctors = doctorRepo.findByCityAndSpecialization(dto.getCity(), dto.getSpecialization());
		List<DoctorResponseDTO> dtoList  = new ArrayList<>();
		for(Doctor d:doctors) {
			if(d.getUserId().getIsActive() == true && d.getUserId().getStatus() == UserStatus.VERIFIED && d.getUserId().getIsActive() == true) {
				
				int did = d.getId();
				String fullName = d.getFirstName()+" "+d.getLastName();
				String city = d.getCity();
				String clinicAddress = d.getClinicAddress();
				String mobileNo = d.getMobileNo();
				UserGender gender =d.getGender();
				String degree = d.getDegree();
				String specialization = d.getSpecialization();
				int experience = d.getExperience();
				String photoUrl = "/doctor/photo/"+d.getUserId().getId();
				String certUrl = "/doctor/certificate/"+d.getUserId().getId();
				LocalDate dob = d.getDob();
				String email = d.getUserId().getEmail();
				UserStatus status = d.getUserId().getStatus();
				int userId = d.getUserId().getId();
				String clinicName = d.getClinicName();
				double fee = d.getFee();
				boolean active = d.getUserId().getIsActive();
				dtoList.add(new DoctorResponseDTO(active,fee,clinicName,userId,did, fullName, city, clinicAddress, mobileNo, gender, degree, specialization, experience, photoUrl, dob, email, status,certUrl));
			}
			
			
		}
		return dtoList;
	}

	@Override
	public List<FeedbackResponseDTO> getDoctorFeedback() {
		List<Feedback> feedbackList =  feedbackRepo.findByRole(UserRole.ROLE_DOCTOR);
		List<FeedbackResponseDTO> dtoList = new ArrayList<>();
		for(Feedback f:feedbackList) {
			 User u = f.getUser();
			 Doctor d = doctorRepo.findByUserId(f.getUser());
			 String email = u.getEmail();
			 String fullName = d.getFirstName()+" "+d.getLastName();
			 String message = f.getMessage();
			 String dateAndTime = f.getDate()+" - "+f.getTime();
			 UserRole role = f.getRole();
			 String photoUrl = "/doctor/photo/"+u.getId();
			dtoList.add(new FeedbackResponseDTO(email,fullName ,message ,dateAndTime , role, photoUrl));
			
		}
		return dtoList;
	}

	@Override
	public List<FeedbackResponseDTO> getPatientFeedback() {
		List<Feedback> feedbackList =  feedbackRepo.findByRole(UserRole.ROLE_PATIENT);
		List<FeedbackResponseDTO> dtoList = new ArrayList<>();
		for(Feedback f:feedbackList) {
			 User u = f.getUser();
			 Patient p = patientRepo.findByUserId(u);
			 String email = u.getEmail();
			 String fullName = p.getFirstName()+" "+p.getLastName();
			 String message = f.getMessage();
			 String dateAndTime = f.getDate()+" - "+f.getTime();
			 UserRole role = f.getRole();
			 String photoUrl = "/patient/photo/"+u.getId();
			dtoList.add(new FeedbackResponseDTO(email,fullName ,message ,dateAndTime , role, photoUrl));
			
		}
		return dtoList;
	}

}
