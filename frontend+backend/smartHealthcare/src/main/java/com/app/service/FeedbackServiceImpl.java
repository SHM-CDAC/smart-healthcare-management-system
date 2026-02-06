package com.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExc.ResourceNotFoundException;
import com.app.dao.DoctorRepository;
import com.app.dao.FeedbackRepository;
import com.app.dao.PatientRepository;
import com.app.dao.UserRepository;
import com.app.dto.FeedbackRequestDTO;
import com.app.dto.FeedbackResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Feedback;
import com.app.pojos.Patient;
import com.app.pojos.UserRole;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private FeedbackRepository feedbackRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Override
	public String addFeedbackForApp(int id, FeedbackRequestDTO dto)  {
		String result = "Feedback Added Successfully!!!";
		if(dto.getRole() == UserRole.ROLE_DOCTOR) {
			Doctor doc = doctorRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
			
			Feedback doctorFeedback = new Feedback();
			doctorFeedback.setMessage(dto.getMessage());
			doctorFeedback.setRole(dto.getRole());
			doctorFeedback.setDate(LocalDate.now());
			doctorFeedback.setTime(LocalTime.now());
			doctorFeedback.setUser(doc.getUserId());
			feedbackRepo.save(doctorFeedback);
			return result;
		}
		else if(dto.getRole() == UserRole.ROLE_PATIENT) {
		  Patient patient = patientRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!"));
		  
		  Feedback patientFeedback = new Feedback();
		  patientFeedback.setMessage(dto.getMessage());
		  patientFeedback.setRole(dto.getRole());
		  patientFeedback.setDate(LocalDate.now());
		  patientFeedback.setTime(LocalTime.now());
		  patientFeedback.setUser(patient.getUserId());
		  feedbackRepo.save(patientFeedback);
		  return result;
		}
		return "Admin Cannot Add Feedbacks :(";
	}

	@Override
	public List<FeedbackResponseDTO> getAllFeedbacks() {
		List<Feedback> feedbacks = feedbackRepo.findAll();
		List<FeedbackResponseDTO> dtoList = new ArrayList<>();
		for(Feedback feedback:feedbacks) {
			if(feedback.getRole() == UserRole.ROLE_PATIENT) {
				Patient p = patientRepo.findByUserId(feedback.getUser());
				dtoList.add(new FeedbackResponseDTO(feedback.getUser().getEmail(),
						p.getFirstName()+" "+p.getLastName(),
						feedback.getMessage() , 
						feedback.getDate()+" - "+feedback.getTime(), 
						feedback.getRole(), 
						"/patient/photo/"+feedback.getUser().getId()
						));
			}
			else {
				Doctor d = doctorRepo.findByUserId(feedback.getUser());
				dtoList.add(new FeedbackResponseDTO(feedback.getUser().getEmail(),
						d.getFirstName()+" "+d.getLastName(),
						feedback.getMessage() , 
						feedback.getDate()+" - "+feedback.getTime(), 
						feedback.getRole(), 
						"/doctor/photo/"+feedback.getUser().getId()
						));
			}
			
		}
		return dtoList;
	}
	

}
