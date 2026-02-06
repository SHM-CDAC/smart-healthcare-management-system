package com.app.security;

import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojos.User;
import com.app.pojos.UserStatus;
import com.app.customExc.ResourceNotFoundException;
import com.app.dao.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor

public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	
		User user=userRepository.findByEmail(email)
				.orElseThrow(() -> new BadCredentialsException("Invalid Credentials! try again."));
		
		if(!user.getIsActive())
			throw new ResourceNotFoundException("User Account is In-Active!");
			
		if(user.getStatus() == UserStatus.BLOCKED)
			throw new ResourceNotFoundException("Your Account is Blocked!!!");
		
		//email verified
		return new UserPrincipal(user.getId(),
				user.getEmail(),user.getPassword(),
				List.of(new SimpleGrantedAuthority(user.getRole().name())),user.getRole().name());
	}

}
