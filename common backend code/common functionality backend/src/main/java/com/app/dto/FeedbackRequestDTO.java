package com.app.dto;

import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackRequestDTO {

	private String message;
	private UserRole role;
	
}
