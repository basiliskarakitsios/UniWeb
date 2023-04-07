package com.schoolapp.uniweb.model;

import jakarta.persistence.Id;

public class Enlist {
    private String email;
    private String courseName;
    private String fullName;
    private float grade;

    public Enlist() {
    }

    public Enlist(String email, String courseName, String fullName, float grade) {
        this.email = email;
        this.courseName = courseName;
        this.fullName = fullName;
        this.grade = grade;
    }

    public String getEmail() {
        return email;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getFullName() {
        return fullName;
    }

    public float getGrade() {
        return grade;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setGrade(float grade) {
        this.grade = grade;
    }
}
