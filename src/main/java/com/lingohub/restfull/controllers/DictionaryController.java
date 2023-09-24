package com.lingohub.restfull.controllers;


import com.lingohub.restfull.models.Dictionary;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.DictionaryService;
import com.lingohub.restfull.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
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
            try {
                return new ResponseEntity<>(dictionaryService.create(dictionary), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToUser(@RequestParam("userId") int userId,
                                       @RequestParam("dictionaryId") Long dictionaryId,
                                       HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(dictionaryService.addToUser(userId, dictionaryId), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getAllDictionariesByUserId(HttpServletRequest request,
                                                        @PathVariable("userId") int userId) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(dictionaryService.getAllByUserId(userId), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }
}
