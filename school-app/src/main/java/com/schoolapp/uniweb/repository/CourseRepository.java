package com.schoolapp.uniweb.repository;

import com.schoolapp.uniweb.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, String> {

}
