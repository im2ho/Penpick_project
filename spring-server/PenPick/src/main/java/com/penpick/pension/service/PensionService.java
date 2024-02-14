package com.penpick.pension.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.penpick.pension.model.Pensions;
import com.penpick.pension.model.pimg;
import com.penpick.pension.repository.PensionImgRepository;
import com.penpick.pension.repository.PensionRepository;

@Service
public class PensionService {
	
	@Autowired 
	private PensionRepository pensionRepository;
	@Autowired 
	private PensionImgRepository pensionImgRepository;
	
	
	//============================================가을이 것=======================================

	//펜션 통합 검색
	public List<Pensions> PensionList(String term){
		List<Pensions> pList = pensionRepository.findByNameOrAddressContaining(term);
		return pensionRepository.findByNameOrAddressContaining(term);
	}
	
	//펜션 통합 검색
	public List<Pensions> PensionFilterList(String term,String filter){
		
		if("바베큐장".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findByBarbequeContaining(term, "있음");
		}else if("공용샤워실".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findByPublic_showerContaining(term, "있음");
		}else if("노래방".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findByKaraokeContaining(term,"있음");
		}else if("운동시설".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findBySportsContaining(term,"있음");
		}else if("세미나룸".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findBySeminarContaining(term,"있음");
		}else if("사우나".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findByNameContaining(term,"있음");
		}else if("캠프파이어".equals(filter)) {
			System.out.println("필터링 단어 : "+filter);
			return pensionRepository.findByCampfireContaining(term,"있음");
		}else {
		return pensionRepository.findByNameOrAddressContaining(term);
		}
	}
	
	//펜션 전부가져오기
	public List<Pensions> getAllPensionList(){
		
		return pensionRepository.findAll();
	}
	
	public List<pimg> getAllImages(){
		return pensionImgRepository.findAll();
	}

	
	//============================================서광원 것===============================================
	// 펜션 아이디 가져오기
		public Pensions getPensionById(Long id) {
			return pensionRepository.findPensionById(id);
		}
		
	//=======================================동재님 것=======================================
		public List<Pensions> getAllPensions() {
		     return pensionRepository.findAll();
		 }

		 public Pensions getPensionsById(Long id) {
		     return pensionRepository.findById(id)
		             .orElseThrow(() -> new RuntimeException("Pensions not found with id: " + id));
		 }

	
}