package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookedSlotResponseDTO;
import com.app.dto.BookingRequestDTO;
import com.app.dto.PatientBookedSlotResponseDTO;
import com.app.pojos.AppointmentBooking;
import com.app.service.BookingService;

@CrossOrigin
@RestController
@RequestMapping("/appointment")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/book/{id}")
	public ResponseEntity<?> bookAppointment(@PathVariable("id") int slotId, @RequestBody BookingRequestDTO bookingDto)  {
		String response = bookingService.bookAnAppointmentSlot(slotId, bookingDto);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/booked/doctor/{doctorId}")
	public ResponseEntity<?> getBookedAppointments(@PathVariable int doctorId) {
		List<BookedSlotResponseDTO> responseDto = bookingService.fetchBookedAppointmentDetails(doctorId);
		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/earning/{doctorId}")
	public ResponseEntity<?> getDoctorEarnings(@PathVariable int doctorId){
		double earnings = bookingService.getEarnings(doctorId);
		return ResponseEntity.ok(earnings);
	}
	
	@GetMapping("/booked/patient/{patientId}")
	public ResponseEntity<?> getPatientAppointments(@PathVariable int patientId) {
		List<PatientBookedSlotResponseDTO> bookedSlots = bookingService.getAppointmentForPatient(patientId);
		return ResponseEntity.ok(bookedSlots);
	}
	
	@PatchMapping("/cancel/{slotId}/patient/{patientId}")
	public ResponseEntity<?> cancelBookedAppointment(@PathVariable int patientId,@PathVariable int slotId) {
		String response = bookingService.cancelMyBookedAppointment(patientId, slotId);
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/cancel/{slotId}/doctor/{doctorId}")
	public ResponseEntity<?> cancelCreatedAppointment(@PathVariable int doctorId, @PathVariable int slotId) {
		String response = bookingService.cancelMyCreatedAppointment(doctorId, slotId);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/upcoming/patient/{patientId}")
	public ResponseEntity<?> getUpcomingBookedAppointmentsForPatient(@PathVariable int patientId){
		List<PatientBookedSlotResponseDTO> dto = bookingService.getPatientUpcomingAppointment(patientId);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/history/patient/{patientId}")
	public ResponseEntity<?> getPatientApmtHistory(@PathVariable int patientId){
		List<PatientBookedSlotResponseDTO> dtoList = bookingService.getPatientAppointmentHistory(patientId);
		return ResponseEntity.ok(dtoList);
	}
	
	@GetMapping("/cancelled/patient/{patientId}")
	public ResponseEntity<?> getPatientCancelledApmts(@PathVariable int patientId){
		List<PatientBookedSlotResponseDTO> dtoList = bookingService.getPatientCancelledAppointments(patientId);
		return ResponseEntity.ok(dtoList);
	}
	
	@GetMapping("/upcoming/doctor/{doctorId}")
	public ResponseEntity<?> getDoctorUpcomingApmts(@PathVariable int doctorId){
		List<BookedSlotResponseDTO> dtoList = bookingService.getUpcomingApmtsForDoctor(doctorId);
		return ResponseEntity.ok(dtoList);
	}
	
	@GetMapping("/history/doctor/{doctorId}")
	public ResponseEntity<?> getDoctorApmtHistory(@PathVariable int doctorId){
		List<BookedSlotResponseDTO> dtoList = bookingService.getDoctorApmtHistory(doctorId);
		return ResponseEntity.ok(dtoList);
	}
	
	@GetMapping("/cancelled/doctor/{doctorId}")
	public ResponseEntity<?> getDoctorCancelledApmts(@PathVariable int doctorId){
		List<BookedSlotResponseDTO> dtoList = bookingService.getCancelledApmtsForDoctor(doctorId);
		return ResponseEntity.ok(dtoList);
	}
	
	@GetMapping("/all/doctor/{doctorId}")
	public ResponseEntity<?> getAllTypesOfApmtsForDoctor(@PathVariable int doctorId){
		List<BookedSlotResponseDTO> dtoList = bookingService.getAllAppointmentBookingsForDoctor(doctorId);
		return ResponseEntity.ok(dtoList);
	}
}
