package com.app.customExc;

public class ResourceNotFoundException extends RuntimeException{

	public ResourceNotFoundException(String errmsg) {
		super(errmsg);
	}
}
