package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorLoginResponseDTO {
	private int userId;
	private int doctorId;
	private String email;
	private UserRole role;
	private UserStatus status;
	private String firstName;
	private String lastName;
	private UserGender gender;
	private String city;
	private String clinicAddress;
	private String mobileNo;
	private String degree;
	private String clinicName;
	private String specialization;
	private int experience;
	private double fee;
	private LocalDate dob;
	private String photoUrl;
	private String certUrl;
}
