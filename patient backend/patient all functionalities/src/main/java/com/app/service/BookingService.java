package com.app.service;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.app.dto.BookedSlotResponseDTO;
import com.app.dto.BookingRequestDTO;
import com.app.dto.PatientBookedSlotResponseDTO;
import com.app.pojos.AppointmentBooking;

public interface BookingService {
	public String bookAnAppointmentSlot(int slotId,BookingRequestDTO bookingDto);
	public List<BookedSlotResponseDTO> fetchBookedAppointmentDetails(int doctorId) ;
	public double getEarnings(int doctorId);
	public List<PatientBookedSlotResponseDTO> getAppointmentForPatient(int patientId);
	public String cancelMyBookedAppointment(int patientId,int slotId);
	public String cancelMyCreatedAppointment(int doctorId,int slotId);
	public List<PatientBookedSlotResponseDTO> getPatientUpcomingAppointment(int patientId);
	public List<PatientBookedSlotResponseDTO> getPatientAppointmentHistory(int patientId);
	public List<PatientBookedSlotResponseDTO> getPatientCancelledAppointments(int patientId);
	public List<BookedSlotResponseDTO> getUpcomingApmtsForDoctor(int doctorId);
	public List<BookedSlotResponseDTO> getDoctorApmtHistory(int doctorId);
	public List<BookedSlotResponseDTO> getCancelledApmtsForDoctor(int doctorId);
	public List<BookedSlotResponseDTO> getAllAppointmentBookingsForDoctor(int doctorId);
	
}
