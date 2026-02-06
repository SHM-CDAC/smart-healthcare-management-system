package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.app.pojos.SlotStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SlotResponseDTO {
	private int id;
	private LocalTime startTime;
	private LocalTime endTime;
	private LocalDate date;
	private SlotStatus status;
	
	public SlotResponseDTO(int id, LocalTime startTime, LocalTime endTime, LocalDate date, SlotStatus status) {
		
		this.id = id;
		this.startTime = startTime;
		this.endTime = endTime;
		this.date = date;
		this.status = status;
	}
	
	
}
