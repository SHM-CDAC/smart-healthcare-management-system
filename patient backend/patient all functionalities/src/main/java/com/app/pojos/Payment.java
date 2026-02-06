package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name= "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity{
	
	@Column(nullable = false,columnDefinition = "TIME(0)")
	private LocalTime time;
	
	@Column(nullable = false)
	private LocalDate date;
	
	@Column(nullable = false)
	private double amount;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false,name = "payment_mode")
	private PaymentMode paymentMode;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentStatus status;
	
	@OneToOne
	@JoinColumn(name = "booking_id",nullable = false)
	private AppointmentBooking appointmentBooking;
	
	@ManyToOne
	@JoinColumn(name = "slot_id",nullable = false)
	private AppointmentSlot slot;
}
