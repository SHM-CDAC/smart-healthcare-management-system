package com.app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration // To declare a java config class (equivalent to bean config xml file)
@EnableWebSecurity // to enable spring security
@EnableMethodSecurity // optional to add method level authorization rules
@RequiredArgsConstructor
public class SecurityConfiguration {
	// ctor based D.I
	private final PasswordEncoder passwordEncoder;
	private final CustomJwtVerificationFilter jwtFilter;

	/*
	 * Configure Spring sec filter chain as a spring bean (@Bean) , to override the
	 * spring sec defaults - Disable CSRF protection - Disable HttpSession - Disable
	 * login / logout page generation (i.e disable form login) - retain Basic
	 * Authentication scheme. - Add authorization rules - swagger , sign in , sign
	 * up , listing doctors.. - public end points - any other request - authenticate
	 * Add HttpSecurity as the dependency - to build sec filter chain
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		// disable CSRF protection
		http
		.cors(Customizer.withDefaults())
		.csrf(csrf -> csrf.disable());
		// disable HttpSession creation
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// add url based authentication n authorization rules
		http.authorizeHttpRequests(request ->
//configure public end points
		request.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.requestMatchers("/api/public/doctors", "/api/public/doctor/feedbacks", "/api/public/patient/feedbacks", "/user/doctor/register",
				"/user/patient/register", "/user/pwd-encryption","/user/login","/review/doctor/**"
				,"/patient/photo/**","/doctor/photo/**","/slot/available/**","/admin/photo/**","/doctor/certificate/**").permitAll()
				
				.requestMatchers("/feedback/add/**","/appointment/cancel/**").hasAnyRole("PATIENT","DOCTOR")
				
				.requestMatchers("/admin/**","/feedback").hasRole("ADMIN")
				
				.requestMatchers("/user/changePwd").hasAnyRole("ADMIN","PATIENT","DOCTOR")
				
				.requestMatchers("/patient/**","/appointment/book/**","/appointment/upcoming/patient/**"
						,"/appointment/history/patient/**","/appointment/cancelled/patient/**"
						,"/review/create").hasRole("PATIENT")
				
				.requestMatchers("/doctor/**","/appointment/earning/**","/appointment/upcoming/doctor/**"
						,"/appointment/history/doctor/**","/appointment/cancelled/doctor/**"
						,"/appointment/all/doctor/**","/slot/**").hasRole("DOCTOR")
				
				.anyRequest().authenticated())
				
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	// Configure AuthManager as spring bean
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
