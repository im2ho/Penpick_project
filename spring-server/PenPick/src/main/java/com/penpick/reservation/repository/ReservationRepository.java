package com.penpick.reservation.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.penpick.reservation.model.Reservation;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
//    List<Reservation> findByPenpickUser(Users penpickUser);
    
    
//    @Query("SELECT r FROM Reservation r JOIN Users p ON r.phoneNumber = p.phoneNumber WHERE r.phoneNumber = :phoneNumber")
//    List<Reservation> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);
//    @Query("SELECT r FROM Reservation r JOIN Users p ON r.phoneNumber = p.phoneNumber)
//    List<Reservation> findByEmail(@Param("email") String email);
//    	@Query("SELECT r FROM Reservation r JOIN Users p ON r.phoneNumber = p.phoneNumber")
//    	List<Reservation> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);
    	
    	//유저와 일치하는 예약 불러오기
    	@Query("SELECT r FROM Reservation r WHERE r.phoneNumber =:phoneNumber")
    	List<Reservation> findReservationsByPhoneNumber(@Param("phoneNumber") String phoneNumber);
    	
    	void deleteById(Long id);
    	
    	@Query("SELECT r FROM Reservation r WHERE r.id =:id")
    	Optional<Reservation> findById(@Param("id")Long id);
    	
    	//24시간 이후의 값만 불러오기
    	@Query("SELECT r FROM Reservation r WHERE r.penpickUser.id = :userId AND r.checkOutDay >= :twentyFourHoursLater")
    	List<Reservation> findReservationsByPenpickUserIdAndCheckOutDayGreaterThanEqual(@Param("userId") Long userId, @Param("twentyFourHoursLater") LocalDate twentyFourHoursLater);
    	
    	// 펜션 id와 일치하는 예약 불러오기
    	@Query("SELECT r FROM Reservation r WHERE r.pensions.id = :pensions AND r.checkInDay <= :checkInDay AND r.checkOutDay >= :checkInDay OR r.pensions.id = :pensions AND r.checkInDay <= :checkOutDay AND r.checkOutDay >= :checkOutDay")
    	List<Reservation> findReservationByPensionsId(@Param("pensions") Long pensions, @Param("checkInDay") LocalDate checkInDay, @Param("checkOutDay") LocalDate checkOutDay);


}