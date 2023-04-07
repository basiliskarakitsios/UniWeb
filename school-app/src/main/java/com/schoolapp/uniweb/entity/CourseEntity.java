package com.schoolapp.uniweb.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class CourseEntity  {
    @Id
    private String courseName;
    private String teacherName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private long semester;
    private long ects;

    public CourseEntity() {
    }

    public CourseEntity(String courseName, String teacherName, String description, long semester, long ects) {
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.description = description;
        this.semester = semester;
        this.ects = ects;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public String getDescription() {
        return description;
    }

    public long getSemester() {
        return semester;
    }

    public long getEcts() {
        return ects;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSemester(long semester) {
        this.semester = semester;
    }

    public void setEcts(long ects) {
        this.ects = ects;
    }
}
