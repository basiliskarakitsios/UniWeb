package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> getAllUsers();

    User getUserByEmailId(String emailId);

    boolean deleteUser(String emailId);

    User updateUser(String emailId, User user);
}
