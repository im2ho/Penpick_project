package com.penpick.reservation.service;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.pension.model.Pensions;
import com.penpick.pension.service.PensionService;
import com.penpick.reservation.model.Reservation;
import com.penpick.reservation.repository.ReservationRepository;
import com.penpick.users.model.Users;
import com.penpick.users.service.UserService;


@Service
public class ReservationService{

    @Autowired
    private UserService userService;

    @Autowired
    private PensionService pensionService;

    @Autowired
    private ReservationRepository reservationRepository; 
    

    public void makeReservation(Long id,String email,String phoneNumber,int people,String pick,String payment,int pay,Date checkInDay,Date checkOutDay,String roomType)  {

		Pensions pensions = pensionService.getPensionById(id);
//    	Pensions pensions = pensionService.getPensionsById(id);
    	Users users = userService.getUserByEmail(email);
       

        Reservation reservation = new Reservation();
        reservation.setPenpickUser(users);
        reservation.setPensions(pensions);
//        reservation.setEmail(email);
        reservation.setPhoneNumber(phoneNumber);
        reservation.setPeople(people);
        reservation.setPick(pick);
        reservation.setPayment(payment);
        reservation.setPay(pay);
        reservation.setCheckInDay(checkInDay);
        reservation.setCheckOutDay(checkOutDay);
        reservation.setRoomType(roomType);

        reservationRepository.save(reservation);
    }

    
    public List<Reservation> getAllReservation(){
    	return reservationRepository.findAll();
    }
    
  //24시간 이후 데이터 가져오기
    public List<Reservation> findReservationsAfter24HoursByPenpickUserId(Long id) {
        LocalDate twentyFourHoursLater = LocalDate.now().plusDays(2); // plusDays에 1을 주면 오늘 날자만 제외되므로 다음날까지 제외하려면 2를 주어야함
        return reservationRepository.findReservationsByPenpickUserIdAndCheckOutDayGreaterThanEqual(id, twentyFourHoursLater);
    }
    

    
    public Optional<Reservation> getReservation(Long id){
    	return reservationRepository.findById(id);
    }
//    
    public void deleteReservation(Long id) {
      reservationRepository.deleteById(id);
    }
    
    //예약 정보 전화번호로 불러오기
    public List<Reservation> findReservationsByPhoneNumber(String phoneNumber) {
      return reservationRepository.findReservationsByPhoneNumber(phoneNumber);
    }
    
    //예약 수정을 위한 저장 메서드
    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
    
    // 펜션 id로 예약 정보를 가져오기 위한 메서드
    public List<Reservation> findReservationByPensionsId(Long pensions,LocalDate checkInDay , LocalDate checkOutDay){
    	System.out.println("서비스" + reservationRepository.findReservationByPensionsId(pensions,checkInDay,checkOutDay));
    	return reservationRepository.findReservationByPensionsId(pensions,checkInDay ,checkOutDay);
    }
    
    
}