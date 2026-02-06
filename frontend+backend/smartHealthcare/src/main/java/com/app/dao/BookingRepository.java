package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.AppointmentBooking;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.BookingStatus;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;


public interface BookingRepository extends JpaRepository<AppointmentBooking, Integer>{
	public List<AppointmentBooking> findByStatusAndDoctor(BookingStatus status, Doctor doctor);
	public List<AppointmentBooking> findByStatusInAndDoctor(List<BookingStatus> statuses,Doctor doctor);
	public List<AppointmentBooking> findByDoctor(Doctor doctor);
	public List<AppointmentBooking> findByPatient(Patient patient);
	public Optional<AppointmentBooking> findByPatientAndSlotAndStatus(Patient patient,AppointmentSlot slot,BookingStatus status);
	public AppointmentBooking findByDoctorAndSlot(Doctor doctor,AppointmentSlot slot);
	public List<AppointmentBooking> findByPatientIdAndStatus(int patientId,BookingStatus status);
	@Query(nativeQuery = true, value = "select d.* from appointment_booking booking, doctors d where booking.doctor_id = d.id and booking.status in ('BOOKED','CANCELLED_BY_PATIENT') group by booking.doctor_id")
	public List<Doctor> findDoctorsWithAtleastOneBooking();
	public List<AppointmentBooking> findByDoctorIdAndStatus(int doctorId,BookingStatus status);
	;
	public List<AppointmentBooking> findByDoctorIdAndStatusIn(int doctorId,List<BookingStatus> statusList);
	public List<AppointmentBooking> findByPatientIdAndStatusIn(int doctorId,List<BookingStatus> statusList);
//	@Query(nativeQuery = true, value = "select count(*) from appointment_booking booking where booking.status in ('BOOKED','CANCELLED_BY_PATIENT') group by booking.doctor_id")
//	public int findPatientCount();  
}

