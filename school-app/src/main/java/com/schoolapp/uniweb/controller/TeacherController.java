package com.schoolapp.uniweb.controller;

import com.schoolapp.uniweb.model.Teacher;
import com.schoolapp.uniweb.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/teachers")
    public Teacher saveUser(@RequestBody Teacher teacher){
        return teacherService.saveUser(teacher);
    }

    @GetMapping("/teachers")
    public List<Teacher> getAllUsers(){
        return teacherService.getAllUsers();
    }

    @GetMapping("/teachers/{emailId}")
    public ResponseEntity<Teacher> getUserByEmailId(@PathVariable("emailId") String emailId){
        Teacher teacher = null;
        teacher = teacherService.getUserByEmailId(emailId);
        return ResponseEntity.ok(teacher);
    }

    @DeleteMapping("/teachers/{emailId}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable("emailId") String emailId){
        boolean deleted = false;
        deleted = teacherService.deleteUser(emailId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/teachers/{emailId}")
    public ResponseEntity<Teacher> updateUser(@PathVariable("emailId") String emailId, @RequestBody Teacher teacher){
        teacher = teacherService.updateUser(emailId, teacher);
        return  ResponseEntity.ok(teacher);
    }
}
