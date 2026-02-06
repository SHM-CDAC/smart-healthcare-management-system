package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedback")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Feedback extends BaseEntity{
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String message;
	
	@Column(nullable = false, columnDefinition = "TIME(0)")
	private LocalTime time;
	
	@Column(nullable = false)
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserRole role;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
