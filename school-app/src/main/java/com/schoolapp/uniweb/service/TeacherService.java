package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.model.Teacher;

import java.util.List;

public interface TeacherService {
    Teacher saveUser(Teacher teacher);

    List<Teacher> getAllUsers();

    Teacher getUserByEmailId(String emailId);

    boolean deleteUser(String emailId);

    Teacher updateUser(String emailId, Teacher teacher);
}
