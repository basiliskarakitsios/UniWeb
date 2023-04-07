package com.schoolapp.uniweb.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers")
public class TeacherEntity {
    @Id
    private String emailId;
    private String firstName;
    private String lastName;
    private String status;

    public TeacherEntity() {
    }

    public TeacherEntity(String emailId, String firstName, String lastName, String status) {
        this.emailId = emailId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
    }

    public String getEmailId() {
        return emailId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getStatus() { return status; }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setStatus(String status) { this.status = status; }
}
