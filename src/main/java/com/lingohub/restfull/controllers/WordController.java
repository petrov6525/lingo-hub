package com.lingohub.restfull.controllers;

import com.lingohub.restfull.helpers.TranslateHelper;
import com.lingohub.restfull.models.Word;
import com.lingohub.restfull.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/word")
public class WordController {
    private final AuthService authService;

    public WordController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/translate")
    public ResponseEntity<?> translate(@RequestBody Word word,
                                       HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(TranslateHelper.translate(word), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }
}
