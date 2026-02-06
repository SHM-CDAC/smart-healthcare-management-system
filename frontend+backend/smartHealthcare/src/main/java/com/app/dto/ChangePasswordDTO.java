package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDTO {
	private int userId;
	private String oldPassword;
	private String newPassword;
}
