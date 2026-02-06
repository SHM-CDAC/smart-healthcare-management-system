package com.app.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends BaseEntity{

	@Column(length = 30,nullable = false,unique = true)
	private String email;
	
	@Column(length = 80,nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20,nullable = false)
	private UserRole role;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20,nullable = false)
	private UserStatus status;
	
	@Column(nullable = false)
	private Boolean isActive = true;
	
	
}
