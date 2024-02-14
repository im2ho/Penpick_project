package com.penpick.pension.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.penpick.pension.model.Pensions;


public interface PensionRepository extends JpaRepository<Pensions, Long>{
	
//	//펜션이름 검색
//	List<Pensions> findByName1(String name);
//	
//	//	지역 검색
//	List<Pensions> findByAddressContaining(String address);
	
	//통합 검색
	 @Query("SELECT p FROM Pensions p WHERE p.name LIKE %:term% OR p.address LIKE %:term% ")
	 List<Pensions> findByNameOrAddressContaining(@Param("term") String term);
	 
	//사우나 필터링 검색
	 @Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.sauna =%:filter%")
	List<Pensions> findByNameContaining(@Param("term") String term, @Param("filter")String filter);
	 
	//노래방 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.karaoke =%:filter%")
	List<Pensions> findByKaraokeContaining(@Param("term") String term, @Param("filter")String filter);
	
	//바베큐 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.barbeque =%:filter%")
	List<Pensions> findByBarbequeContaining(@Param("term") String term, @Param("filter")String filter);
	
	//캠프파이어 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.campfire =%:filter%")
	List<Pensions> findByCampfireContaining(@Param("term") String term, @Param("filter")String filter);
	
	//피시방 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.pc_room =%:filter%")
	List<Pensions> findByPc_roomContaining(@Param("term") String term, @Param("filter")String filter);
	
	//공용샤워실 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.public_shower =%:filter%")
	List<Pensions> findByPublic_showerContaining(@Param("term") String term, @Param("filter")String filter);
	
	//세미나룸 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.seminar =%:filter%")
	List<Pensions> findBySeminarContaining(@Param("term") String term, @Param("filter")String filter);
	
	//운동시설 필터링 검색
	@Query("SELECT p FROM Pensions p WHERE (p.name LIKE %:term% OR p.address LIKE %:term%) and p.sports =%:filter%")
	List<Pensions> findBySportsContaining(@Param("term") String term, @Param("filter")String filter);
	 

	 //======================================서광원 것=========================================
	 Pensions findPensionById(Long id);
	 
	 
	 //======================================서동재 것=========================================
	 Pensions getPensionsById(Long id); 

}