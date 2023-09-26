package com.lingohub.restfull.controllers;

import com.lingohub.restfull.factory.MainFactory;
import com.lingohub.restfull.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/factory")
public class FactoryController {
    private final MainFactory mainFactory;
    private final AuthService authService;

    public FactoryController(MainFactory mainFactory, AuthService authService) {
        this.mainFactory = mainFactory;
        this.authService = authService;
    }

    @PostMapping("/init")
    public ResponseEntity<?> initAll(HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                mainFactory.run();
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }
}
