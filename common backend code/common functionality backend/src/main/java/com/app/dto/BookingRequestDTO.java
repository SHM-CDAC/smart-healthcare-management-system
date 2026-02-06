package com.app.dto;

import org.springframework.stereotype.Service;

import com.app.pojos.BookingStatus;
import com.app.pojos.PaymentMode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDTO {
	
	private int patientId;
	private int doctorId;
	private BookingStatus status;
	private double amount;
	private PaymentMode paymentMode;
}
