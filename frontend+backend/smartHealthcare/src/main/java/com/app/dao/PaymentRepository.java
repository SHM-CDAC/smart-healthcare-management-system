package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.AppointmentBooking;
import com.app.pojos.Payment;
import java.util.List;


public interface PaymentRepository extends JpaRepository<Payment,Integer>{
	public Payment findByAppointmentBooking(AppointmentBooking appointmentBooking);
	public Payment findByAppointmentBookingIdAndSlotId(int bookingId,int appointmentId);
//	@Query(nativeQuery = true, value = "select * from payment where booking_id in ")
//	public Payment findPaymentByAppointmentBooking(AppointmentBooking appointmentBooking);
}
