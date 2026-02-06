package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.app.pojos.BookingStatus;
import com.app.pojos.UserGender;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookedSlotResponseDTO {
	private LocalTime startTime;
	private LocalTime endTime;
	private LocalDate date;
	private String patientName;
	private String address;
	private String city;
	private UserGender gender;
	private String mobileNo;
	private String photoUrl;
	private double fee;
	private String bookedAt;
	private BookingStatus status;
	private LocalDate dob;
	
	public BookedSlotResponseDTO(LocalDate dob,LocalTime startTime, LocalTime endTime, LocalDate date, String patientName,
			String address, String city, UserGender gender, String mobileNo, String photoUrl, double fee,
			String bookedAt, BookingStatus status) {
		this.dob = dob;
		this.startTime = startTime;
		this.endTime = endTime;
		this.date = date;
		this.patientName = patientName;
		this.address = address;
		this.city = city;
		this.gender = gender;
		this.mobileNo = mobileNo;
		this.photoUrl = photoUrl;
		this.fee = fee;
		this.bookedAt = bookedAt;
		this.status = status;
	}
	
	
	
}
