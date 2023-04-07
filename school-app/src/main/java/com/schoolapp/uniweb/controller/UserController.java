package com.schoolapp.uniweb.controller;

import com.schoolapp.uniweb.model.User;
import com.schoolapp.uniweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/users/{emailId}")
    public ResponseEntity<User> getUserByEmailId(@PathVariable("emailId") String emailId){
        User user = null;
        user = userService.getUserByEmailId(emailId);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{emailId}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable("emailId") String emailId){
        boolean deleted = false;
        deleted = userService.deleteUser(emailId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{emailId}")
    public ResponseEntity<User> updateUser(@PathVariable("emailId") String emailId, @RequestBody User user){
        user = userService.updateUser(emailId, user);
        return  ResponseEntity.ok(user);
    }
}
