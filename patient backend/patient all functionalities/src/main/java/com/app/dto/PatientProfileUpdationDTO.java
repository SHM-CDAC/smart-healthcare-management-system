package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientProfileUpdationDTO {
		private int patientId;
		private int userId;
		private UserRole role;
		private UserStatus status;
		private String email;
		private String firstName;
		private String lastName;
		private String city;
		private String address;
		private UserGender gender;
		private String mobileNo;
		private LocalDate dob;
		private String photoUrl;
		
}
