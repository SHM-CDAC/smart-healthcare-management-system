package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Feedback;
import java.util.List;
import com.app.pojos.UserRole;


public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
	public List<Feedback> findByRole(UserRole role);
}
