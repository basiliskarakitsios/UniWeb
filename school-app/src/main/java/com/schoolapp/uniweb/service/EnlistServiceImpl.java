package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.entity.EnlistEntity;
import com.schoolapp.uniweb.entity.EnlistPK;
import com.schoolapp.uniweb.model.Enlist;
import com.schoolapp.uniweb.repository.EnlistRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnlistServiceImpl implements EnlistService {
    private EnlistRepository enlistRepository;

    public EnlistServiceImpl(EnlistRepository enlistRepository) {
        this.enlistRepository = enlistRepository;
    }

    @Override
    public Enlist saveEnlist(Enlist enlist) {
        EnlistEntity enlistEntity = new EnlistEntity();
        BeanUtils.copyProperties(enlist, enlistEntity);
        enlistRepository.save(enlistEntity);
        return enlist;
    }

    @Override
    public List<Enlist> getAllEnlists() {
        List<EnlistEntity> enlistEntities = enlistRepository.findAll();
        List<Enlist> enlists = enlistEntities
                .stream()
                .map(userEntity -> new Enlist(
                        userEntity.getEmail(),
                        userEntity.getCourseName(),
                        userEntity.getFullName(),
                        userEntity.getGrade()))
                .collect(Collectors.toList());
        return enlists;
    }

    @Override
    public Enlist getEnlistByPK(EnlistPK pk) {
        EnlistEntity enlistEntity = enlistRepository.findById(pk).get();
        Enlist enlist = new Enlist();
        BeanUtils.copyProperties(enlistEntity, enlist);
        return enlist;
    }

    @Override
    public List<Enlist> getEnlistByCourseName(String courseName) {
        List<EnlistEntity> enlistEntities = enlistRepository.findByCourseName(courseName);
        List<Enlist> enlists = new ArrayList<>(enlistEntities.size());
        for(int i = 0; i < enlistEntities.size(); i++){
            enlists.add(new Enlist());
            BeanUtils.copyProperties(enlistEntities.get(i), enlists.get(i));
        }
        return enlists;
    }

    @Override
    public boolean deleteEnlist(EnlistPK pk) {
        EnlistEntity enlist = enlistRepository.findById(pk).get();
        enlistRepository.delete(enlist);
        return true;
    }

    @Override
    public Enlist updateEnlist(EnlistPK pk, Enlist enlist) {
        EnlistEntity enlistEntity = enlistRepository.findById(pk).get();
        enlistEntity.setEmail(enlist.getEmail());
        enlistEntity.setCourseName(enlist.getCourseName());
        enlistEntity.setFullName(enlist.getFullName());
        enlistEntity.setGrade(enlist.getGrade());
        enlistRepository.save(enlistEntity);
        return enlist;
    }
}
