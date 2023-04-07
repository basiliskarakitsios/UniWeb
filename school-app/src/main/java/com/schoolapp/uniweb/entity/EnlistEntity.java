package com.schoolapp.uniweb.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enlist")
@IdClass(EnlistPK.class)
public class EnlistEntity {
    @Id
    private String email;
    @Id
//    @Column(insertable=false, updatable=false)
    private String courseName;
    private String fullName;
    private float grade;

//    @ManyToOne
//    @JoinColumn(name = "courseName")
//    private CourseEntity course;

    public EnlistEntity() {
    }

    public EnlistEntity(String email, String courseName, String fullName, float grade) {
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

//    public CourseEntity getCourse() {
//        return course;
//    }
//
//    public void setCourse(CourseEntity course) {
//        this.course = course;
//    }
}
