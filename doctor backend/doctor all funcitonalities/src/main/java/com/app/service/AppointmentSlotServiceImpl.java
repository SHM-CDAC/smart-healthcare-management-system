package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExc.ResourceNotFoundException;
import com.app.dao.DoctorRepository;
import com.app.dao.SlotRepository;
import com.app.dto.SlotCreationDTO;
import com.app.dto.SlotResponseDTO;
import com.app.pojos.AppointmentSlot;
import com.app.pojos.Doctor;
import com.app.pojos.SlotStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AppointmentSlotServiceImpl implements AppointmentSlotService {

	@Autowired
	private SlotRepository slotRepo;
	
	@Autowired
	private DoctorRepository doctorRepo;
	
	@Override
	public String addSlot(int id, SlotCreationDTO slotDto)  {
		Doctor d = doctorRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Doctor Not Found!!"));
		AppointmentSlot slot = new AppointmentSlot();
		slot.setDate(slotDto.getDate());
		slot.setStartTime(slotDto.getStartTime());
		slot.setEndTime(slotDto.getEndTime());
		slot.setStatus(slotDto.getStatus());
		slot.setDoctor(d);
		slotRepo.save(slot);
		return "Appointment Created Successfuly!!!";
		
	}

	@Override
	public List<SlotResponseDTO> getAllSlotsForDoctor(int doctorId) {
		
		Doctor doctor = doctorRepo.findById(doctorId).orElseThrow(()->new ResourceNotFoundException("Doctor Not Found!!"));
		List<AppointmentSlot> slots = slotRepo.findByDoctor(doctor);
		List<SlotResponseDTO> resDto = new ArrayList<>();
		for(AppointmentSlot slot :slots) {
			resDto.add(new SlotResponseDTO(slot.getId(),slot.getStartTime(),slot.getEndTime(),slot.getDate(),slot.getStatus()));
		}
		return resDto;
	}

	@Override
	public List<SlotResponseDTO> getAvailableSlots(int doctorId) {
		List<AppointmentSlot> availableSlots = slotRepo.findByStatusAndDoctorId(SlotStatus.VACANT, doctorId);
		List<SlotResponseDTO> resDto = new ArrayList<>();
	
		for(AppointmentSlot slot :availableSlots) {
			resDto.add(new SlotResponseDTO(slot.getId(),slot.getStartTime(),slot.getEndTime(),slot.getDate(),slot.getStatus()));
		}
		return resDto;
		
	}
	
	public List<SlotResponseDTO> getAvailableSlotsForPatient(int doctorId) {
		List<AppointmentSlot> apmtList = slotRepo.findAvailableSlot(doctorId);
		List<SlotResponseDTO> resDto = new ArrayList<>();
		
		for(AppointmentSlot slot :apmtList) {
			resDto.add(new SlotResponseDTO(slot.getId(),slot.getStartTime(),slot.getEndTime(),slot.getDate(),slot.getStatus()));
		}
		return resDto;
	}
	
	public String cancelUnbookedSlot(int slotId) {
		AppointmentSlot slot = slotRepo.findById(slotId).orElseThrow(()-> new ResourceNotFoundException("Appointment Slot not Found"));
		slot.setStatus(SlotStatus.REMOVED);
		return "Appointment slot Cancelled Successfuly!!";
	}

}
