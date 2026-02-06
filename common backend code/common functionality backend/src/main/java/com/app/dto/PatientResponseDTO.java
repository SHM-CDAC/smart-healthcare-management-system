package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientResponseDTO {
	private int patientId;
	private String fullName;
	private String city;
	private String address;
	private UserGender gender;
	private String mobileNo;
	private LocalDate dob;
	private String email;
	private String photoUrl;
	private UserStatus status;
	private boolean active;
	
	public PatientResponseDTO(boolean active,UserStatus status,int patientId,String fullName, String city, String address, UserGender gender, String mobileNo,
			LocalDate dob, String email, String photoUrl) {
		this.active = active;
		this.status = status;
		this.patientId = patientId;
		this.fullName = fullName;
		this.city = city;
		this.address = address;
		this.gender = gender;
		this.mobileNo = mobileNo;
		this.dob = dob;
		this.email = email;
		this.photoUrl = photoUrl;
	}
	
	
}
