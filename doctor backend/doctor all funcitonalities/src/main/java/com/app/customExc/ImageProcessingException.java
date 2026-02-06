package com.app.customExc;

public class ImageProcessingException extends RuntimeException{
	public ImageProcessingException(String errmsg) {
		super(errmsg);
	}
}
