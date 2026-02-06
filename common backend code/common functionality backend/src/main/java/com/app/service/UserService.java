package com.app.service;

import com.app.pojos.User;

public interface UserService {
	Boolean checkIfUserExists(String email);
	User addUserIntoDB(User u);
	User validateUser(String email, String pwd) ;
	User getUserDetails(int id) ;
	String changeUserPassword(int userId,String oldPwd, String newPwd);
	public String encryptPasswords();
}
