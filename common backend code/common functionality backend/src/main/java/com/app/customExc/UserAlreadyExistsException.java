package com.app.customExc;

public class UserAlreadyExistsException extends RuntimeException{

	public UserAlreadyExistsException(String msg) {
		super(msg);
	}
}
