package com.app.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.customExc.ResourceNotFoundException;
import com.app.dao.BookingRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.PatientRepository;
import com.app.dao.PaymentRepository;
import com.app.dao.SlotRepository;
import com.app.dto.BookedSlotResponseDTO;
import com.app.dto.BookingRequestDTO;
import com.app.dto.PatientBookedSlotResponseDTO;
import com.app.pojos.AppointmentBooking;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.BookingStatus;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.Payment;
import com.app.pojos.PaymentStatus;
import com.app.pojos.SlotStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepo;
	
	@Autowired
	private PaymentRepository paymentRepo;
	
	@Autowired
	private SlotRepository slotRepo;
	
	@Autowired
	private PatientRepository patientRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Autowired
	private PaymentRepository payRepo;
	
	@Override
	public String bookAnAppointmentSlot(int slotId, BookingRequestDTO bookingDto)  {
	 AppointmentSlot apmtSlot = slotRepo.findById(slotId).orElseThrow(()->new ResourceNotFoundException("Slot Not Found!!"));
	 apmtSlot.setStatus(SlotStatus.BOOKED);
	 AppointmentSlot updatedSlot = slotRepo.save(apmtSlot);
	 Patient patient = patientRepo.findById(bookingDto.getPatientId()).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!"));
	 Doctor doctor = doctorRepo.findById(bookingDto.getDoctorId()).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
	 AppointmentBooking apmtBooking = new AppointmentBooking();
	 apmtBooking.setTime(LocalTime.now());
	 apmtBooking.setDate(LocalDate.now());
	 apmtBooking.setSlot(updatedSlot);
	 apmtBooking.setPatient(patient);
	 apmtBooking.setDoctor(doctor);
	 apmtBooking.setStatus(bookingDto.getStatus());
	 
	 AppointmentBooking bookedSlot = bookingRepo.save(apmtBooking);
	 
	 Payment apmtPayment = new Payment();
	 apmtPayment.setAmount(bookingDto.getAmount());
	 apmtPayment.setTime(LocalTime.now());
	 apmtPayment.setDate(LocalDate.now());
	 apmtPayment.setStatus(PaymentStatus.SUCCESS);
	 apmtPayment.setPaymentMode(bookingDto.getPaymentMode());
	 apmtPayment.setAppointmentBooking(bookedSlot);
	 apmtPayment.setSlot(updatedSlot);
	 
	 payRepo.save(apmtPayment);
	 return "Appointment Booked Successfully!!!";
	}

	@Override
	public List<BookedSlotResponseDTO> fetchBookedAppointmentDetails(int doctorId) {
		Doctor doctor = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		List<AppointmentBooking> apmtList = bookingRepo.findByStatusAndDoctor(BookingStatus.BOOKED, doctor);
		List<BookedSlotResponseDTO> dto = new ArrayList<>();
		
		for(AppointmentBooking bookedApmt:apmtList) {
			dto.add(new BookedSlotResponseDTO(bookedApmt.getPatient().getDob(),bookedApmt.getSlot().getStartTime(),bookedApmt.getSlot().getEndTime(),
					bookedApmt.getDate(),
					bookedApmt.getPatient().getFirstName()+" "+bookedApmt.getPatient().getLastName(),
					bookedApmt.getPatient().getAddress(),bookedApmt.getPatient().getCity(),
					bookedApmt.getPatient().getGender(),bookedApmt.getPatient().getMobileNo(),
					"/patient/photo/"+bookedApmt.getPatient().getId(),bookedApmt.getDoctor().getFee(),
					bookedApmt.getTime()+" - "+bookedApmt.getDate(),bookedApmt.getStatus()));
		}
		
		return dto;
	}

	@Override
	public double getEarnings(int doctorId) {
		Doctor doctor = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		List<BookingStatus> statuses = new ArrayList<>();
		statuses.add(BookingStatus.BOOKED);
		statuses.add(BookingStatus.COMPLETED);
		statuses.add(BookingStatus.CANCELLED_BY_PATIENT);
		
		List<AppointmentBooking> apmtList = bookingRepo.findByStatusInAndDoctor(statuses, doctor);
		
		double earnings = 0.0;
		for(AppointmentBooking bookedApmt:apmtList) {
			Payment paymentDetails = payRepo.findByAppointmentBooking(bookedApmt);
			earnings += paymentDetails.getAmount();
		}
		return earnings;
	}

	@Override
	public List<PatientBookedSlotResponseDTO> getAppointmentForPatient(int patientId){
		Patient patient = patientRepo.findById(patientId).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!"));
		List<AppointmentBooking> bookings =  bookingRepo.findByPatient(patient);
		List<PatientBookedSlotResponseDTO> bookedSlots = new ArrayList<>();
		for(AppointmentBooking booking:bookings) {
		   AppointmentSlot slot =booking.getSlot();
			Doctor d = booking.getDoctor();
			bookedSlots.add(new PatientBookedSlotResponseDTO(slot.getId(),d.getClinicName(),slot.getStartTime(), slot.getEndTime(), 
					slot.getDate(), d.getFirstName()+" "+d.getLastName(), 
					d.getSpecialization(), d.getClinicAddress(), d.getCity(), 
					d.getMobileNo(), booking.getDate()+" - "+booking.getTime(),d.getDegree(),booking.getStatus(),d.getFee()));
		}
		return bookedSlots;
	}

	@Override
	public String cancelMyBookedAppointment(int patientId,int slotId) {
		Patient patient = patientRepo.findById(patientId).orElseThrow(()-> new ResourceNotFoundException("Patient Not Found!!"));
		AppointmentSlot slot = slotRepo.findById(slotId).orElseThrow(()-> new ResourceNotFoundException("Slot Not Found!!"));
		AppointmentBooking booking = bookingRepo.findByPatientAndSlotAndStatus(patient, slot,BookingStatus.BOOKED)
										.orElseThrow(()-> new ResourceNotFoundException("Slot not found for Cancellation"));
			booking.setStatus(BookingStatus.CANCELLED_BY_PATIENT);
			bookingRepo.save(booking);
			slot.setStatus(SlotStatus.VACANT);
			slotRepo.save(slot);
		return "Appointment Cancelled Successfully!!!";
	}

	@Override
	public String cancelMyCreatedAppointment(int doctorId, int slotId) {
		AppointmentSlot slot = slotRepo.findById(slotId).orElseThrow(()-> new ResourceNotFoundException("Slot Not Found!!"));
		Doctor d = doctorRepo.findById(doctorId).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		AppointmentBooking booking = bookingRepo.findByDoctorAndSlot(d, slot);
		if(booking != null) {
			booking.setStatus(BookingStatus.CANCELLED_BY_DOCTOR);
			bookingRepo.save(booking);
		}
		slot.setStatus(SlotStatus.REMOVED);
		slotRepo.save(slot);
		return "Appointment Cancelled Successfully!!!";
		
	}

	@Override
	public List<PatientBookedSlotResponseDTO> getPatientUpcomingAppointment(int patientId) {
		List<AppointmentBooking> apmtBookings = bookingRepo.findByPatientIdAndStatus(patientId,BookingStatus.BOOKED);
		List<PatientBookedSlotResponseDTO> bookings = new ArrayList<>();
		for(AppointmentBooking apmt: apmtBookings) {
			
				AppointmentSlot slot = apmt.getSlot();
				Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(apmt.getId(), slot.getId());
				if(slot.getDate().isAfter(LocalDate.now()) || 
						(slot.getDate().equals(LocalDate.now()) && slot.getStartTime().isAfter(LocalTime.now()))){
					Doctor d = apmt.getDoctor();
					bookings.add(new PatientBookedSlotResponseDTO(slot.getId(),d.getClinicName(),slot.getStartTime(), slot.getEndTime(), 
							slot.getDate(), d.getFirstName()+" "+d.getLastName(), 
							d.getSpecialization(), d.getClinicAddress(), d.getCity(), 
							d.getMobileNo(), apmt.getDate()+" - "+apmt.getTime(),d.getDegree(),apmt.getStatus(),p.getAmount()));
				
			}
			
		}
		return bookings;
	}
	
	
	public List<PatientBookedSlotResponseDTO> getPatientAppointmentHistory(int patientId){
		List<AppointmentBooking> apmtBookings = bookingRepo.findByPatientIdAndStatus(patientId,BookingStatus.BOOKED);
		List<PatientBookedSlotResponseDTO> bookings = new ArrayList<>();
		for(AppointmentBooking apmt: apmtBookings) {
			AppointmentSlot slot = apmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(apmt.getId(), slot.getId());
			if(slot.getDate().isBefore(LocalDate.now()) || 
					(slot.getDate().equals(LocalDate.now()) && slot.getEndTime().isBefore(LocalTime.now()))){
				Doctor d = apmt.getDoctor();
				bookings.add(new PatientBookedSlotResponseDTO(slot.getId(),d.getClinicName(),slot.getStartTime(), slot.getEndTime(), 
						slot.getDate(), d.getFirstName()+" "+d.getLastName(), 
						d.getSpecialization(), d.getClinicAddress(), d.getCity(), 
						d.getMobileNo(), apmt.getDate()+" - "+apmt.getTime(),d.getDegree(),apmt.getStatus(),p.getAmount()));
			}
			
		}
		return bookings;
	}

	@Override
	public List<PatientBookedSlotResponseDTO> getPatientCancelledAppointments(int patientId) {
		List<AppointmentBooking> apmtBookings = bookingRepo.findByPatientIdAndStatusIn(patientId,
							List.of(BookingStatus.CANCELLED_BY_DOCTOR,BookingStatus.CANCELLED_BY_PATIENT));
		List<PatientBookedSlotResponseDTO> bookings = new ArrayList<>();
		for(AppointmentBooking apmt: apmtBookings) {
			AppointmentSlot slot = apmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(apmt.getId(), slot.getId());
				Doctor d = apmt.getDoctor();
				bookings.add(new PatientBookedSlotResponseDTO(slot.getId(),d.getClinicName(),slot.getStartTime(), slot.getEndTime(), 
						slot.getDate(), d.getFirstName()+" "+d.getLastName(), 
						d.getSpecialization(), d.getClinicAddress(), d.getCity(), 
						d.getMobileNo(), apmt.getDate()+" - "+apmt.getTime(),d.getDegree(),apmt.getStatus(),p.getAmount()));
		}
		return bookings;
		
	}

	
	public List<BookedSlotResponseDTO> getUpcomingApmtsForDoctor(int doctorId){
		List<AppointmentBooking> bookings = bookingRepo.findByDoctorIdAndStatus(doctorId,BookingStatus.BOOKED);
		List<BookedSlotResponseDTO> dto = new ArrayList<>();
		
		for(AppointmentBooking bookedApmt:bookings) {
			AppointmentSlot slot = bookedApmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(bookedApmt.getId(), slot.getId());
			if(slot.getDate().isAfter(LocalDate.now()) || 
					(slot.getDate().equals(LocalDate.now()) && slot.getStartTime().isAfter(LocalTime.now()))) {
				
				dto.add(new BookedSlotResponseDTO(bookedApmt.getPatient().getDob(),bookedApmt.getSlot().getStartTime(),bookedApmt.getSlot().getEndTime(),
						slot.getDate(),
						bookedApmt.getPatient().getFirstName()+" "+bookedApmt.getPatient().getLastName(),
						bookedApmt.getPatient().getAddress(),bookedApmt.getPatient().getCity(),
						bookedApmt.getPatient().getGender(),bookedApmt.getPatient().getMobileNo(),
						"/patient/photo/"+bookedApmt.getPatient().getId(),p.getAmount(),
						bookedApmt.getDate()+" - "+bookedApmt.getTime(),bookedApmt.getStatus()));
			}
			
		}
		
		return dto;
		
	}
	
	public List<BookedSlotResponseDTO> getDoctorApmtHistory(int doctorId){
		List<AppointmentBooking> bookings = bookingRepo.findByDoctorIdAndStatus(doctorId,BookingStatus.BOOKED);
		List<BookedSlotResponseDTO> dto = new ArrayList<>();
		for(AppointmentBooking bookedApmt:bookings) {
			AppointmentSlot slot = bookedApmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(bookedApmt.getId(), slot.getId());
			if(slot.getDate().isBefore(LocalDate.now()) || 
					(slot.getDate().equals(LocalDate.now()) && slot.getStartTime().isBefore(LocalTime.now()))) {
				
				dto.add(new BookedSlotResponseDTO(bookedApmt.getPatient().getDob(),bookedApmt.getSlot().getStartTime(),bookedApmt.getSlot().getEndTime(),
						slot.getDate(),
						bookedApmt.getPatient().getFirstName()+" "+bookedApmt.getPatient().getLastName(),
						bookedApmt.getPatient().getAddress(),bookedApmt.getPatient().getCity(),
						bookedApmt.getPatient().getGender(),bookedApmt.getPatient().getMobileNo(),
						"/patient/photo/"+bookedApmt.getPatient().getId(),p.getAmount(),
						bookedApmt.getDate()+" - "+bookedApmt.getTime(),bookedApmt.getStatus()));
			}
			
		}
		
		return dto;
		
	}

	public List<BookedSlotResponseDTO> getCancelledApmtsForDoctor(int doctorId){
		List<AppointmentBooking> bookings = bookingRepo.findByDoctorIdAndStatusIn(doctorId,
				List.of(BookingStatus.CANCELLED_BY_DOCTOR,BookingStatus.CANCELLED_BY_PATIENT));
		List<BookedSlotResponseDTO> dto = new ArrayList<>();
		for(AppointmentBooking bookedApmt:bookings) {
			AppointmentSlot slot = bookedApmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(bookedApmt.getId(), slot.getId());
				dto.add(new BookedSlotResponseDTO(bookedApmt.getPatient().getDob(),bookedApmt.getSlot().getStartTime(),bookedApmt.getSlot().getEndTime(),
						slot.getDate(),
						bookedApmt.getPatient().getFirstName()+" "+bookedApmt.getPatient().getLastName(),
						bookedApmt.getPatient().getAddress(),bookedApmt.getPatient().getCity(),
						bookedApmt.getPatient().getGender(),bookedApmt.getPatient().getMobileNo(),
						"/patient/photo/"+bookedApmt.getPatient().getId(),p.getAmount(),
						bookedApmt.getDate()+" - "+bookedApmt.getTime(),bookedApmt.getStatus()));
			}
			
		
		
		return dto;
	}
	
	public List<BookedSlotResponseDTO> getAllAppointmentBookingsForDoctor(int doctorId){
		List<AppointmentBooking> bookings = bookingRepo.findByDoctorIdAndStatusIn(doctorId,
				List.of(BookingStatus.BOOKED,BookingStatus.CANCELLED_BY_PATIENT));
		List<BookedSlotResponseDTO> dto = new ArrayList<>();
		for(AppointmentBooking bookedApmt:bookings) {
			AppointmentSlot slot = bookedApmt.getSlot();
			Payment p = paymentRepo.findByAppointmentBookingIdAndSlotId(bookedApmt.getId(), slot.getId());
				dto.add(new BookedSlotResponseDTO(bookedApmt.getPatient().getDob(),bookedApmt.getSlot().getStartTime(),bookedApmt.getSlot().getEndTime(),
						slot.getDate(),
						bookedApmt.getPatient().getFirstName()+" "+bookedApmt.getPatient().getLastName(),
						bookedApmt.getPatient().getAddress(),bookedApmt.getPatient().getCity(),
						bookedApmt.getPatient().getGender(),bookedApmt.getPatient().getMobileNo(),
						"/patient/photo/"+bookedApmt.getPatient().getId(),p.getAmount(),
						bookedApmt.getDate()+" - "+bookedApmt.getTime(),bookedApmt.getStatus()));
			}
			
		 
		
		return dto;
	}
}
