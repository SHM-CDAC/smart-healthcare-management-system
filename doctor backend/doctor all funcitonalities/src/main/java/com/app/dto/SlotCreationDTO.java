package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.app.pojos.SlotStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SlotCreationDTO {

	private LocalDate date;
	private LocalTime startTime;
	private LocalTime endTime;
	private SlotStatus status;
	
}
