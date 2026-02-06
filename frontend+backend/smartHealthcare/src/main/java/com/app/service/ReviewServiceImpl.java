package com.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExc.ResourceNotFoundException;
import com.app.dao.DoctorRepository;
import com.app.dao.PatientRepository;
import com.app.dao.ReviewRepository;
import com.app.dto.DoctorReviewResponseDTO;
import com.app.dto.ReviewCreationDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.Review;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Override
	public String addReview(ReviewCreationDTO dto)  {
		Review review = new Review();
		review.setStory(dto.getStory());
		review.setDate(LocalDate.now());
		review.setTime(LocalTime.now());
		Doctor d = doctorRepo.findById(dto.getDoctorId()).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!!"));
		Patient p = patientRepo.findById(dto.getPatientId()).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!!"));
		review.setDoctor(d);
		review.setPatient(p);
		reviewRepo.save(review);
		return "Review Added Successfully!!!";
	}

	@Override
	public List<DoctorReviewResponseDTO> getMyReviews(int doctorId)  {
		Doctor d = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!!"));
		List<Review> reviews = reviewRepo.findByDoctor(d);
		List<DoctorReviewResponseDTO> dto = new ArrayList<>();
		for(Review review:reviews) {
			dto.add(new DoctorReviewResponseDTO(review.getPatient().getFirstName()+" "+review.getPatient().getLastName(),
					review.getDate()+" - "+review.getTime(), review.getStory(), 
					"/patient/photo/"+review.getPatient().getUserId().getId()));
		}
		return dto;
	}

	

}
