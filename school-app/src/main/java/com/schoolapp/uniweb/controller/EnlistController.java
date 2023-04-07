package com.schoolapp.uniweb.controller;

import com.schoolapp.uniweb.entity.EnlistPK;
import com.schoolapp.uniweb.model.Enlist;
import com.schoolapp.uniweb.service.EnlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EnlistController {
    @Autowired
    private EnlistService enlistService;

    public EnlistController(EnlistService enlistService) {
        this.enlistService = enlistService;
    }

    @PostMapping("/enlist")
    public Enlist saveEnlist(@RequestBody Enlist enlist){
        return enlistService.saveEnlist(enlist);
    }

    @GetMapping("/enlist")
    public List<Enlist> getAllElists(){
        return enlistService.getAllEnlists();
    }

    @GetMapping("/enlist/{email}/{courseName}")
    public ResponseEntity<Enlist> getEnlistByPK(@PathVariable("email") String email, @PathVariable("courseName") String courseName){
        EnlistPK pk = new EnlistPK();
        pk.setEmail(email);
        pk.setCourseName(courseName);
        Enlist enlist = null;
        enlist = enlistService.getEnlistByPK(pk);
        return ResponseEntity.ok(enlist);
    }

    @GetMapping("/enlist/{courseName}")
    public ResponseEntity<List<Enlist>> getEnlistByCourseName(@PathVariable("courseName") String courseName){
        List<Enlist> enlist = null;
        enlist = enlistService.getEnlistByCourseName(courseName);
        return ResponseEntity.ok(enlist);
    }

    @DeleteMapping("/enlist/{email}/{courseName}")
    public ResponseEntity<Map<String, Boolean>> deleteEnlist(@PathVariable("email") String email, @PathVariable("courseName") String courseName){
        boolean deleted = false;
        EnlistPK pk = new EnlistPK();
        pk.setEmail(email);
        pk.setCourseName(courseName);
        deleted = enlistService.deleteEnlist(pk);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/enlist/{email}/{courseName}")
    public ResponseEntity<Enlist> updateEnlist(@PathVariable("email") String email, @PathVariable("courseName") String courseName, @RequestBody Enlist enlist){
        EnlistPK pk = new EnlistPK();
        pk.setEmail(email);
        pk.setCourseName(courseName);
        enlist = enlistService.updateEnlist(pk, enlist);
        return  ResponseEntity.ok(enlist);
    }
}
