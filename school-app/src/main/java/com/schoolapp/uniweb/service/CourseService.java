package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.model.Course;

import java.util.List;

public interface CourseService {
    Course saveCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseByName(String courseName);

    boolean deleteCourse(String courseName);

    Course updateCourse(String courseName, Course course);
}
