package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.app.pojos.BookingStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientBookedSlotResponseDTO {
	private LocalTime startTime;
	private LocalTime endTime;
	private LocalDate date;	
	private String doctorName;
	private String speciality;
	private String clinicAddress;
	private String city;
	private double fee;
	private String mobileNo;
	private String bookedAt;
	private String degree;
	private BookingStatus status;
	private String clinicName;
	private int slotId;
	
	public PatientBookedSlotResponseDTO(int slotId,String clinicName,LocalTime startTime, LocalTime endTime, LocalDate date, String doctorName,
			String speciality, String clinicAddress, String city, String mobileNo, String bookedAt,String degree, BookingStatus status,double fee) {
		this.slotId = slotId;
		this.clinicName = clinicName;
		this.startTime = startTime;
		this.endTime = endTime;
		this.date = date;
		this.doctorName = doctorName;
		this.speciality = speciality;
		this.clinicAddress = clinicAddress;
		this.city = city;
		this.mobileNo = mobileNo;
		this.bookedAt = bookedAt;
		this.degree = degree;
		this.status = status;
		this.fee = fee;
	}
	
	
}
