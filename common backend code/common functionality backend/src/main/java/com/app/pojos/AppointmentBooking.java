package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appointment_booking")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentBooking extends BaseEntity {
	
	@Column(nullable = false,columnDefinition = "TIME(0)")
	private LocalTime time;
	
	@Column(nullable = false)
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BookingStatus status;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id",nullable = false)
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name = "slot_id",nullable = false)
	private AppointmentSlot slot;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;
}
