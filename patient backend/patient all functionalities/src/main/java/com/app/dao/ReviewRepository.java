package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Review;
import java.util.List;
import com.app.pojos.Doctor;


public interface ReviewRepository extends JpaRepository<Review, Integer>{

	public List<Review> findByDoctor(Doctor doctor);
}
