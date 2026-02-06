package com.app.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FileStorageServiceImpl implements FileStorageService {

	@Override
	public String storeFiles(MultipartFile img, String filePath) throws IOException {
		
		 if (img == null || img.isEmpty()) {
		        return "default.png"; 
		 }
		 
		String fileName = UUID.randomUUID() + "_" + img.getOriginalFilename();
		
		Files.createDirectories(Paths.get(filePath));
		
		Files.copy(img.getInputStream(),
	            Paths.get(filePath + fileName),
	            StandardCopyOption.REPLACE_EXISTING);
	    
	    return fileName;

	}

}
