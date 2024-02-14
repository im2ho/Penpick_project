package com.penpick.pension.controller;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.pension.dto.PensionImgDTO;
import com.penpick.pension.model.pimg;
import com.penpick.pension.service.PensionService;

@RestController
@RequestMapping("/")
public class PensionImgController {

    @Autowired
    private PensionService pensionService;

	@GetMapping("/all")
    public ResponseEntity<List<PensionImgDTO>> getAllImages() {
        List<pimg> images = pensionService.getAllImages();
        List<PensionImgDTO> imageDTOs = images.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(imageDTOs);
    }
    private PensionImgDTO convertToDTO(pimg img) {
        if (img == null) {
            return null;
        }

        PensionImgDTO dto = new PensionImgDTO();
        dto.setImageName(img.getImageName());
        try {
            Blob imageData = img.getImageData();
            if (imageData != null) {
                byte[] imageDataBytes = imageData.getBytes(1, (int) imageData.length());
                dto.setImageData(Base64.getEncoder().encodeToString(imageDataBytes));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        dto.setName(img.getName());
        return dto;
    }
}