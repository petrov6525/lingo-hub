package com.lingohub.restfull.controllers;

import com.lingohub.restfull.factory.UserFactory;
import com.lingohub.restfull.models.User;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserFactory userFactory;
    private final AuthService authService;

    public UserController(UserService userService, UserFactory userFactory, AuthService authService) {
        this.userService = userService;
        this.userFactory = userFactory;
        this.authService = authService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers (HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> getUserById (@PathVariable("id") int id, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
            return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @GetMapping("/init")
    public ResponseEntity<?> init(HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            userFactory.run();
            return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @PostMapping("/update-logo")
    public ResponseEntity<?> updateLogo(@RequestParam("userId")int userId,
                                        @RequestParam("logoId")long logoId,
                                        HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            Object object = userService.updateLogo(userId, logoId);
            return userService.createResponseByUser(object);
        }
        return authService.createUnauthorizedResponse();
    }

}
