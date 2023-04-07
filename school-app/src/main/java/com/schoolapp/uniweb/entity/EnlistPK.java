package com.schoolapp.uniweb.entity;

import java.io.Serializable;
import java.util.Objects;

public class EnlistPK implements Serializable {
    private String email;
    private String courseName;


    public String getEmail() {
        return email;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        EnlistPK enlistPK = (EnlistPK) obj;
        return email.equals(enlistPK.email) && courseName.equals(enlistPK.courseName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, courseName);
    }
}
