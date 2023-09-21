package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.User;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@RequestBody User user) {
        User authUser = authService.logIn(user);
        if (authUser == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(authUser, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logOut(@RequestBody User user, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            User logoutUser = authService.logOut(user);
            return new ResponseEntity<>(logoutUser, HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }
}
