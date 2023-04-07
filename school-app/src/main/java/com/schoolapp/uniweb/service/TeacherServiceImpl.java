package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.entity.TeacherEntity;
import com.schoolapp.uniweb.model.Teacher;
import com.schoolapp.uniweb.repository.TeacherRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements TeacherService {
    private TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public Teacher saveUser(Teacher teacher) {
        TeacherEntity teacherEntity = new TeacherEntity();
        BeanUtils.copyProperties(teacher, teacherEntity);
        teacherRepository.save(teacherEntity);
        return teacher;
    }

    @Override
    public List<Teacher> getAllUsers() {
        List<TeacherEntity> userEntities = teacherRepository.findAll();
        List<Teacher> teachers = userEntities
                .stream()
                .map(teacherEntity -> new Teacher(
                teacherEntity.getEmailId(),
                teacherEntity.getFirstName(),
                teacherEntity.getLastName(),
                teacherEntity.getStatus()))
                .collect(Collectors.toList());
        return teachers;
    }

    @Override
    public Teacher getUserByEmailId(String emailId) {
        TeacherEntity teacherEntity = teacherRepository.findById(emailId).get();
        Teacher teacher = new Teacher();
        BeanUtils.copyProperties(teacherEntity, teacher);
        return teacher;
    }

    @Override
    public boolean deleteUser(String emailId) {
        TeacherEntity user = teacherRepository.findById(emailId).get();
        teacherRepository.delete(user);
        return true;
    }

    @Override
    public Teacher updateUser(String emailId, Teacher teacher) {
        TeacherEntity teacherEntity = teacherRepository.findById(emailId).get();
        teacherEntity.setEmailId(teacher.getEmailId());
        teacherEntity.setFirstName(teacher.getFirstName());
        teacherEntity.setLastName(teacher.getLastName());
        teacherEntity.setStatus(teacher.getStatus());
        teacherRepository.save(teacherEntity);
        return teacher;
    }
}
