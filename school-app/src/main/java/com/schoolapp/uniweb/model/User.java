package com.schoolapp.uniweb.model;

public class User {
    private String emailId;
    private String password;
    private String fullName;
    private String status;

    public User() {
    }

    public User(String emailId, String password, String fullName, String status) {
        this.emailId = emailId;
        this.password = password;
        this.fullName = fullName;
        this.status = status;
    }

    public String getEmailId() {
        return emailId;
    }

    public String getPassword() { return password; }

    public String getFullName() { return fullName; }

    public String getStatus() { return status; }

    public void setEmailId(String emailId) { this.emailId = emailId; }

    public void setPassword(String password) { this.password = password; }

    public void setFullName(String fullName) { this.fullName = fullName; }

    public void setStatus(String status) { this.status = status; }
}
