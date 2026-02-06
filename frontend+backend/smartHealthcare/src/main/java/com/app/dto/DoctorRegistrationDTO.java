package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.UserGender;
import com.app.pojos.UserRole;
import com.app.pojos.UserStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorRegistrationDTO {
	
	@NotBlank(message = "Email is required")
	@Pattern(regexp = "^[A-Za-z0-9_+.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",message = "Enter valid email!")
	private String email;
	
	@NotBlank(message = "password is required")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$",message = "Password must contain atleast 1 alphabet,digit & special character")
	private String password;
	
	@Pattern(
		    regexp = "^[A-Za-z .'-]+$",
		    message = "Name can contain only alphabets and spaces"
	)
	private String firstName;
	
	@Pattern(
		    regexp = "^[A-Za-z .'-]+$",
		    message = "Name can contain only alphabets and spaces"
		)
	private String lastName;
	
	private UserGender gender;
	
	@Pattern(
		    regexp = "^[A-Za-z .-]+$",
		    message = "City can contain only alphabets and spaces"
		)
	private String city;
	
	private String clinicAddress;
	
	@Pattern(regexp = "^\\d{10}$",message = "phone no. can contain only digits")
	private String mobileNo;
	
	@Pattern(regexp = "^[A-Za-z]+$",message = "degree can contain only alphabets")
	private String degree;
	
	private String clinicName;
	private String specialization;
	
	@Min(value = 1, message = "Experience cannot be negative or zero")
	@Max(value = 120, message = "Experience must be less than or equal to 120")
	private int experience;
	
	@Min(value = 1, message = "Fee cannot be negative or zero")
	private double fee;
	
	@Past(message = "Date of birth must be in the past")
	private LocalDate dob;
}
