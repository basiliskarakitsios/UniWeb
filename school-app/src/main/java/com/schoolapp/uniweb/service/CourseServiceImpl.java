package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.entity.CourseEntity;
import com.schoolapp.uniweb.model.Course;
import com.schoolapp.uniweb.repository.CourseRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService{
    private CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course saveCourse(Course course) {
        CourseEntity courseEntity = new CourseEntity();
        BeanUtils.copyProperties(course, courseEntity);
        courseRepository.save(courseEntity);
        return course;
    }

    @Override
    public List<Course> getAllCourses() {
        List<CourseEntity> courseEntities = courseRepository.findAll();
        List<Course> courses = courseEntities
                .stream()
                .map(userEntity -> new Course(
                        userEntity.getCourseName(),
                        userEntity.getTeacherName(),
                        userEntity.getDescription(),
                        userEntity.getSemester(),
                        userEntity.getEcts()))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public Course getCourseByName(String courseName) {
        CourseEntity courseEntity = courseRepository.findById(courseName).get();
        Course course = new Course();
        BeanUtils.copyProperties(courseEntity, course);
        return course;
    }

    @Override
    public boolean deleteCourse(String courseName) {
        CourseEntity course = courseRepository.findById(courseName).get();
        courseRepository.delete(course);
        return true;
    }

    @Override
    public Course updateCourse(String courseName, Course course) {
        CourseEntity courseEntity = courseRepository.findById(courseName).get();
        courseEntity.setCourseName(course.getCourseName());
        courseEntity.setTeacherName(course.getTeacherName());
        courseEntity.setDescription(course.getDescription());
        courseEntity.setSemester(course.getSemester());
        courseEntity.setEcts(course.getEcts());
        courseRepository.save(courseEntity);
        return course;
    }
}
