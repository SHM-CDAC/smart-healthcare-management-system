package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.customExc.ResourceNotFoundException;
import com.app.dao.UserRepository;
import com.app.dto.DoctorLoginResponseDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public User addUserIntoDB(User u) {
		User user = userRepo.save(u);
		return user;
	}


	@Override
	public User validateUser(String email, String pwd)  {
		User user = userRepo.findByEmailAndPassword(email, pwd);
		if(user == null)
			throw new ResourceNotFoundException("Invalid Credentials.Please try again!!!");
		
		if(!user.getIsActive())
			throw new ResourceNotFoundException("User Account is In-Active!");
			
		if(user.getStatus() == UserStatus.BLOCKED)
			throw new ResourceNotFoundException("Your Account is Blocked!!!");
	
		return user;
	}


	@Override
	public User getUserDetails(int id) {
		User user = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User not Found!!!"));
		return user;
	}


	@Override
	public Boolean checkIfUserExists(String email) {
		return userRepo.existsByEmail(email);
	}


	@Override
	public String changeUserPassword(int userId,String oldPwd, String newPwd) {
		User user =userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User Not Found!"));
		
		if(passwordEncoder.matches(oldPwd, user.getPassword())) {
			String encodedNewPwd = passwordEncoder.encode(newPwd);
			user.setPassword(encodedNewPwd);
		}
		else
			throw new ResourceNotFoundException("Please enter correct password.");
		
		return "Password Updated Successfully!!!";
		
	}
		
	@Override
	public String encryptPasswords() {
		
		List<User> users = userRepo.findAll();	
		
		users.forEach(user ->
		 user.setPassword(passwordEncoder.encode(user.getPassword())));
		return "Password encrypted";
	}
}
