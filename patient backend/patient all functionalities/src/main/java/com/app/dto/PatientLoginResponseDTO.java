package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientLoginResponseDTO {
	private int userId;
	private int patientId;
	private String email;
	private UserRole role;
	private UserStatus status;
	private String firstName;
	private String lastName;
	private String city;
	private String address;
	private UserGender gender;
	private String mobileNo;
	private LocalDate dob;
	private String photoUrl;
}
