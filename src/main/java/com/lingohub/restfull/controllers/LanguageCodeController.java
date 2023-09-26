package com.lingohub.restfull.controllers;

import com.lingohub.restfull.factory.LanguageCodeFactory;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.LanguageCodeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lang-code")
public class LanguageCodeController {
    private final AuthService authService;
    private final LanguageCodeService languageCodeService;
    private final LanguageCodeFactory languageCodeFactory;

    public LanguageCodeController(AuthService authService, LanguageCodeService languageCodeService, LanguageCodeFactory languageCodeFactory) {
        this.authService = authService;
        this.languageCodeService = languageCodeService;
        this.languageCodeFactory = languageCodeFactory;
    }

    @GetMapping("/init")
    public ResponseEntity<?> init(HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                languageCodeFactory.run();
                return new ResponseEntity<>(languageCodeService.findAll(), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAll(HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(languageCodeService.findAll(), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }
}
