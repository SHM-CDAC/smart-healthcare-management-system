package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponseDTO {
	private int userId;
	private int doctorId;
	private String fullName;
	private String city;
	private String clinicAddress;
	private String clinicName;
	private String mobileNo;
	private UserGender gender;
	private String degree;
	private String specialization;
	private int experience;
	private String photoUrl;
	private String certUrl;
	private LocalDate dob;
	private String email;
	private double fee;
	private UserStatus status;
	private boolean active;
	
	public DoctorResponseDTO(boolean active,double fee,String clinicName,int userId,int doctorId,String fullName, String city, String clinicAddress, String mobileNo, UserGender gender,
			String degree, String specialization, int experience, String photoUrl, LocalDate dob, String email,UserStatus status,String certUrl) {
		this.active = active;
		this.fee = fee;
		this.clinicName = clinicName;
		this.userId =userId;
		this.doctorId = doctorId;
		this.fullName = fullName;
		this.city = city;
		this.clinicAddress = clinicAddress;
		this.mobileNo = mobileNo;
		this.gender = gender;
		this.degree = degree;
		this.specialization = specialization;
		this.experience = experience;
		this.photoUrl = photoUrl;
		this.dob = dob;
		this.email = email;
		this.status = status;
		this.certUrl = certUrl;
	}
	
	
	
}
