package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.AppointmentSlot;
import java.util.List;
import com.app.pojos.Doctor;
import com.app.pojos.SlotStatus;



public interface SlotRepository extends JpaRepository<AppointmentSlot, Integer>{
	public List<AppointmentSlot> findByDoctor(Doctor doctor);
	public List<AppointmentSlot> findByStatusAndDoctorId(SlotStatus status, int doctorId);
	
	@Query(nativeQuery = true,value = "select * from appointment_slot apmt where apmt.doctor_id = :doctorId and apmt.status = 'VACANT' and (apmt.date > CURRENT_DATE or (apmt.date = CURRENT_DATE and apmt.start_time > CURRENT_TIME))")
	public List<AppointmentSlot> findAvailableSlot(@Param("doctorId") int doctorId);
}
