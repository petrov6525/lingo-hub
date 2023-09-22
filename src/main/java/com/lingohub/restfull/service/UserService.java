package com.lingohub.restfull.service;

import com.lingohub.restfull.exception.UserNotFoundException;
import com.lingohub.restfull.models.Logo;
import com.lingohub.restfull.models.User;
import com.lingohub.restfull.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final LogoService logoService;

    @Autowired
    public UserService(UserRepository userRepository, LogoService logoService) {
        this.userRepository = userRepository;
        this.logoService = logoService;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }


    public Object updateLogo(int userId, long logoId) {
        try {
            User user = findUserById(userId);
            logoService.deleteLogoIfExists(user);
            Logo newLogo = logoService.getLogoById(logoId);
            user.setLogo(newLogo);

            return userRepository.save(user);
        }
        catch (Exception ex) {
            return ex.getMessage();
        }
    }

    public ResponseEntity<?> createResponseByUser(Object object) {
        if (object instanceof User) {
            return new ResponseEntity<>(object, HttpStatus.OK);
        }
        return new ResponseEntity<>(object, HttpStatus.BAD_REQUEST);
    }
}
