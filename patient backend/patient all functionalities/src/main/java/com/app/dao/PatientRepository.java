package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserStatus;

public interface PatientRepository extends JpaRepository<Patient, Integer>{
	public Patient findByUserId(User user);
	public List<Patient> findByUserIdStatus(UserStatus status);
	public Patient findByUserIdId(int userId);
}
