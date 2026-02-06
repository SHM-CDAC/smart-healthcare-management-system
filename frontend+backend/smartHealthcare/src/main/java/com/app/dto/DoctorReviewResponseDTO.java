package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorReviewResponseDTO {
	private String patientName;
	private String dateAndTime;
	private String story;
	private String photoUrl;
	
	public DoctorReviewResponseDTO(String patientName, String dateAndTime, String story, String photoUrl) {
		
		this.patientName = patientName;
		this.dateAndTime = dateAndTime;
		this.story = story;
		this.photoUrl = photoUrl;
	}
	
}
