package com.penpick.reservation.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.penpick.pension.service.PensionService;
import com.penpick.reservation.model.Reservation;
import com.penpick.reservation.service.ReservationService;


@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins="http://localhost:3000", 
allowCredentials="true",
allowedHeaders="*")
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	
	 @GetMapping("/list")
		public ResponseEntity<List<Reservation>> getAllReservation() {
			List<Reservation> reservationList = null;
			try {
				reservationList = reservationService.getAllReservation();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return ResponseEntity.ok(reservationList);
	 }
	

	 
	 @GetMapping("/check")
	 public List<Reservation> getReservation(@RequestParam String phoneNumber){
		 List<Reservation> reservationList = reservationService.findReservationsByPhoneNumber(phoneNumber);
		 return reservationList;
	 }
	 
	 //예약 상세정보를 위한 아이디값으로 조회
	 @GetMapping("/reservationDetail")
	 public Optional<Reservation> reservationDetail(@RequestParam Long id) {
		 Optional<Reservation> reservation = reservationService.getReservation(id);
		return reservation;
	 }

	 
     //아이디값으로 조회
	 @GetMapping("/checkId")
	 public Optional<Reservation> getReservation(Long id){
		 return reservationService.getReservation(id);
	 }
	 
	 //예약 삭제
	 @PostMapping("/delete")
	 public void deleteReservation(Long id) {
		  reservationService.deleteReservation(id);
	 }
	 
	 //예약 수정
	 @PutMapping("/update")
	 public ResponseEntity<Reservation> updateReservation(@PathVariable Long id,@RequestBody Reservation updatedReservation){
		 Optional<Reservation> existingReservation = reservationService.getReservation(id);
		 
		 if(existingReservation != null) {
			 Reservation reservation = existingReservation.get();
			 
			 reservation.setPeople(updatedReservation.getPeople());
			 reservation.setRoomType(updatedReservation.getRoomType());
			 reservation.setPickTime(updatedReservation.getPickTime());
			
			 Reservation updatedRes = reservationService.updateReservation(reservation);
			 return ResponseEntity.ok(updatedRes);
		 }else {
			 return ResponseEntity.notFound().build();
		 }
		
	 }
	 
	

	//24시간 이후의 데이터 불러오기
			@GetMapping("/reservationIds")
			public List<Reservation> getReservationsAfter24HoursByPenpickUserId(@RequestParam("id") Long id) {
			    return reservationService.findReservationsAfter24HoursByPenpickUserId(id);
			}
	 
	 
	 
	 
			@PostMapping("/makeReservation")
			public ResponseEntity<String> makeReservation(@RequestBody Map<String, String> request) {
				Long pensions = Long.parseLong(request.get("id"));
				String email = request.get("email");
			    String phoneNumber = request.get("phoneNumber");
			    String pick = request.get("pick");
			    int people = Integer.parseInt(request.get("people"));
			    String payment = request.get("payment");
			    int pay = Integer.parseInt(request.get("pay"));
			    String roomType = request.get("roomType");
			    // 클라이언트에서 보낸 문자열 형식의 날짜 데이터를 Date 객체로 변환
			    Date checkInDay = parseDate(request.get("checkInDay"));
			    Date checkOutDay = parseDate(request.get("checkOutDay"));

			    try {
			        reservationService.makeReservation(pensions,email, phoneNumber, people, pick, payment, pay, checkInDay, checkOutDay, roomType);
			        return ResponseEntity.ok("구매에 성공하였습니다.");
			    } catch (Exception e) {
			        e.printStackTrace();
			        return ResponseEntity.badRequest().body("구매에 실패하였습니다.");
			    }
			}

			// 문자열 형식의 날짜 데이터를 Date 객체로 변환하는 메서드
			private Date parseDate(String dateString) {
			    try {
			        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			        return dateFormat.parse(dateString);
			    } catch (ParseException e) {
			        e.printStackTrace();
			        return null;
			    }
			}

}