package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "review")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review extends BaseEntity{
	
		
		
		@Column(columnDefinition = "TEXT",nullable = false)
		private String story;
		
		@Column(nullable = false)
		private LocalDate date;
		
		@Column(nullable = false,columnDefinition = "TIME(0)")
		private LocalTime time;
		
		@ManyToOne
		@JoinColumn(name = "patient_id",nullable = false)
		private Patient patient;
		
		@ManyToOne
		@JoinColumn(name = "doctor_id",nullable = false)
		private Doctor doctor;
}
