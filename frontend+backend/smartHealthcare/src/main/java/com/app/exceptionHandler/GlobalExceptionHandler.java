package com.app.exceptionHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.customExc.ImageProcessingException;
import com.app.customExc.ResourceNotFoundException;
import com.app.customExc.UserAlreadyExistsException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(exception = ImageProcessingException.class)
	public ResponseEntity<?> handleImageException(ImageProcessingException ex){
		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body("Image is not present...");
	}
	
	@ExceptionHandler(exception = ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex){
		System.out.println("inside resourceNotfound : cause -> "+ex.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(ex.getMessage());
		
	}
	
	@ExceptionHandler(exception = UsernameNotFoundException.class)
	public ResponseEntity<?> handleUsernameNotFoundExc(UsernameNotFoundException ex){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}
	
	@ExceptionHandler(exception = BadCredentialsException.class)
	public ResponseEntity<?> handleInvalidCredentials(BadCredentialsException ex){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
	}
	
	@ExceptionHandler(exception = UserAlreadyExistsException.class)
	public ResponseEntity<?> handleUserExistence(UserAlreadyExistsException ex){
		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ex.getMessage());
	}
	
	@ExceptionHandler(exception = MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Form Property!");
		
	}
		
	 @ExceptionHandler(RuntimeException.class)
	 public ResponseEntity<?> handleGeneral(RuntimeException ex) {
	    return ResponseEntity
	              .status(HttpStatus.INTERNAL_SERVER_ERROR)
	               .body("Something went wrong");
	 }
	
}
