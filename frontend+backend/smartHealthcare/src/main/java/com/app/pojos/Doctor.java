package com.app.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Doctor extends BaseEntity{
	
	@Column(name = "first_name",nullable = false,length = 25)
	private String firstName;
	
	@Column(name = "last_name",nullable = false,length= 25)
	private String lastName;
	
	@Column(nullable = false, length = 25)
	private String city;
	
	@Column(columnDefinition = "TEXT",nullable = false)
	private String clinicAddress;
	
	@Column(name = "mobile_no",nullable = false,length = 15)
	private String mobileNo;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false,length = 20)
	private UserGender gender;
	
	@Column(nullable = false, length = 50)
	private String degree;
	
	@Column(name = "clinic_name",nullable = false,length= 40)
	private String clinicName;
	
	@Column(nullable = false, length = 35)
	private String specialization;
	
	@Column(nullable = false)
	private int experience;
	
	@Column(nullable = false)
	private double fee;
	
	@Column(nullable = false)
	private String certificate;
	
	private String photo;
	
	@Column(nullable = false)
	private LocalDate dob;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	private User userId;
}
