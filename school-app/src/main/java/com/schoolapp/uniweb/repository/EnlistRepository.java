package com.schoolapp.uniweb.repository;

import com.schoolapp.uniweb.entity.EnlistEntity;
import com.schoolapp.uniweb.entity.EnlistPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnlistRepository extends JpaRepository<EnlistEntity, EnlistPK> {
    List<EnlistEntity> findByCourseName(String courseName);
}
