package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.Word;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.TranslateStatisticService;
import com.lingohub.restfull.service.WordService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/word")
public class WordController {
    private final AuthService authService;
    private final WordService wordService;

    private final TranslateStatisticService translateStatisticService;

    public WordController(AuthService authService, WordService wordService, TranslateStatisticService translateStatisticService) {
        this.authService = authService;
        this.wordService = wordService;
        this.translateStatisticService = translateStatisticService;
    }

    @PostMapping("/translate")
    public ResponseEntity<?> translate(@RequestBody Word word,
                                       HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(translateStatisticService.add(wordService.translate(word), request), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToDictionary(@RequestBody Word word, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(wordService.addToDictionary(word), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }
}
