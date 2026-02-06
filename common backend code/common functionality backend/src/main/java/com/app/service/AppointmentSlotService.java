package com.app.service;

import java.util.List;

import com.app.dto.SlotCreationDTO;
import com.app.dto.SlotResponseDTO;
import com.app.pojos.AppointmentSlot;

public interface AppointmentSlotService {
	public String addSlot(int id,SlotCreationDTO dto) ;
	public List<SlotResponseDTO> getAllSlotsForDoctor(int doctorId) ;
	public List<SlotResponseDTO> getAvailableSlots(int doctorId) ;
	public List<SlotResponseDTO> getAvailableSlotsForPatient(int doctorId);
	public String cancelUnbookedSlot(int slotId);
}
