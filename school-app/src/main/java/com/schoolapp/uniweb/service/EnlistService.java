package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.entity.EnlistPK;
import com.schoolapp.uniweb.model.Enlist;

import java.util.List;

public interface EnlistService {
    Enlist saveEnlist(Enlist enlist);

    List<Enlist> getAllEnlists();

    Enlist getEnlistByPK(EnlistPK pk);

    List<Enlist> getEnlistByCourseName(String courseName);

    boolean deleteEnlist(EnlistPK pk);

    Enlist updateEnlist(EnlistPK pk, Enlist enlist);


}
