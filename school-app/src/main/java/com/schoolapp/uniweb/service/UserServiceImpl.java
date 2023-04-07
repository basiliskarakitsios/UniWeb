package com.schoolapp.uniweb.service;

import com.schoolapp.uniweb.entity.UserEntity;
import com.schoolapp.uniweb.model.User;
import com.schoolapp.uniweb.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<User> users = userEntities
                .stream()
                .map(userEntity -> new User(
                        userEntity.getEmailId(),
                        userEntity.getPassword(),
                        userEntity.getFullName(),
                        userEntity.getStatus()))
                .collect(Collectors.toList());
        return users;
    }

    @Override
    public User getUserByEmailId(String emailId) {
        UserEntity userEntity = userRepository.findById(emailId).get();
        User user = new User();
        BeanUtils.copyProperties(userEntity, user);
        return user;
    }

    @Override
    public boolean deleteUser(String emailId) {
        UserEntity user = userRepository.findById(emailId).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User updateUser(String emailId, User user) {
        UserEntity userEntity = userRepository.findById(emailId).get();
        userEntity.setEmailId(user.getEmailId());
        userEntity.setPassword(user.getPassword());
        userEntity.setFullName(user.getFullName());
        userEntity.setStatus(user.getStatus());
        userRepository.save(userEntity);
        return user;
    }
}
