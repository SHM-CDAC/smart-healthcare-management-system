package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackResponseDTO {

	private String email;
	private String fullName;
	private String message;
	private String dateAndTime;
	private UserRole role;
	private String photoUrl;
	
	
	public FeedbackResponseDTO(String email, String fullName, String message, String dateAndTime, UserRole role,
			String photoUrl) {
		
		this.email = email;
		this.fullName = fullName;
		this.message = message;
		this.dateAndTime = dateAndTime;
		this.role = role;
		this.photoUrl = photoUrl;
		
	}
	
	
}
