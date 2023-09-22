package com.lingohub.restfull.controllers;


import com.lingohub.restfull.models.Dictionary;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.DictionaryService;
import com.lingohub.restfull.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dictionary")
public class DictionaryController {
    private final DictionaryService dictionaryService;
    private final AuthService authService;

    public DictionaryController(DictionaryService dictionaryService, AuthService authService) {
        this.dictionaryService = dictionaryService;
        this.authService = authService;
    }


    @PostMapping("/create")
    public ResponseEntity<?> createDictionary
            (@RequestBody Dictionary dictionary, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return dictionaryService.createResponseByDictionary(dictionaryService.create(dictionary));
        }
        return authService.createUnauthorizedResponse();
    }
}
