package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewCreationDTO {

	private String story;
	private int patientId;
	private int doctorId;
}
