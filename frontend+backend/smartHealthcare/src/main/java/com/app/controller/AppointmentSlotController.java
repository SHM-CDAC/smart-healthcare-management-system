package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.dao.SlotRepository;
import com.app.dto.SlotCreationDTO;
import com.app.dto.SlotResponseDTO;
import com.app.pojos.AppointmentSlot;
import com.app.service.AppointmentSlotService;

@CrossOrigin
@RestController
@RequestMapping("/slot")
public class AppointmentSlotController {

	
	@Autowired
	private AppointmentSlotService slotService;

   
	@PostMapping("/create/{id}")
	public ResponseEntity<?> createSlot(@PathVariable int id, @RequestBody SlotCreationDTO slotDto) {
		String response = slotService.addSlot(id,slotDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping("/all/{id}")
	public ResponseEntity<?> fetchAllSlotsForDoctor(@PathVariable("id") int doctorId) {
		List<SlotResponseDTO> allSlots = slotService.getAllSlotsForDoctor(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body(allSlots);
	}
	
	@GetMapping("/vacant/{doctorId}")
	public ResponseEntity<?> fetchAvailableSlots(@PathVariable int doctorId) {
		List<SlotResponseDTO> allSlots = slotService.getAvailableSlots(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body(allSlots);
	}
	
	@GetMapping("/available/{doctorId}")
	public ResponseEntity<?> fetchAvailableSlotForPatients(@PathVariable int doctorId){
		List<SlotResponseDTO> slots = slotService.getAvailableSlotsForPatient(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body(slots);
	}
	
	@PatchMapping("/cancel/{slotId}")
	public ResponseEntity<?> cancelUnbookedAppointmentSlot(@PathVariable int slotId)
	{
		String response = slotService.cancelUnbookedSlot(slotId);
		return ResponseEntity.ok(response);
	}
	
}
