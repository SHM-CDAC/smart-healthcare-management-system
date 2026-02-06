package com.app.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Patient extends BaseEntity{
	
	@Column(name="first_name",nullable = false,length = 25)
	private String firstName;
	
	@Column(name="last_name",nullable = false, length = 25)
	private String lastName;
	
	@Column(nullable = false,length = 25)
	private String city;
	
	@Column(columnDefinition = "TEXT", nullable = false)
	private String address;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false,length = 20)
	private UserGender gender;
	
	@Column(name="mobile_no",nullable = false,length = 15)
	private String mobileNo;
	
	@Column(nullable = false)
	private LocalDate dob;
	
	private String photo;
	
	@OneToOne
	@JoinColumn(name="user_id")
	private User userId;
}
