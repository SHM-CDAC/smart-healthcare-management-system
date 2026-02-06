package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
	
	public String storeFiles(MultipartFile image,String filePath)throws IOException;
}
