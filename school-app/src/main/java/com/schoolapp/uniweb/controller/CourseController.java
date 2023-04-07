package com.schoolapp.uniweb.controller;
import com.schoolapp.uniweb.model.Course;
import com.schoolapp.uniweb.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CourseController {
    @Autowired
    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/courses")
    public Course saveCourse(@RequestBody Course course){
        return courseService.saveCourse(course);
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping("/courses/{courseName}")
    public ResponseEntity<Course> getCourseByName(@PathVariable("courseName") String courseName){
        Course course = null;
        course = courseService.getCourseByName(courseName);
        return ResponseEntity.ok(course);
    }

    @DeleteMapping("/courses/{courseName}")
    public ResponseEntity<Map<String, Boolean>> deleteCourse(@PathVariable("courseName") String courseName){
        boolean deleted = false;
        deleted = courseService.deleteCourse(courseName);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/courses/{courseName}")
    public ResponseEntity<Course> updateCourse(@PathVariable("courseName") String courseName, @RequestBody Course course){
        course = courseService.updateCourse(courseName, course);
        return  ResponseEntity.ok(course);
    }
}
