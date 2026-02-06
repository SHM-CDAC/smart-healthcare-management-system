package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Doctor;
import com.app.pojos.User;
import java.util.List;


public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

	public Doctor findByUserId(User user);
	public Doctor findByUserIdId(int doctorId);
	public List<Doctor> findByCityAndSpecialization(String city, String specialization);
	
}
