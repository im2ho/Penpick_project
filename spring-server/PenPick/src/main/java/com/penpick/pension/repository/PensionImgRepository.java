package com.penpick.pension.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.penpick.pension.model.pimg;

import lombok.Data;

@Repository
public interface PensionImgRepository extends JpaRepository <pimg,String>{
	
	@Query("select p from pimg p where p.imageName like %:name%")
	List<pimg> findByImageNameContaining(@Param("name") String name);

}