package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;
import com.app.pojos.UserRole;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Integer>{
	
	boolean existsByEmail(String email);
	User findByEmailAndPassword(String email, String password);
	User findByRole(UserRole role);
	Optional<User> findByEmail(String email);
//	User findById(int id);
}
