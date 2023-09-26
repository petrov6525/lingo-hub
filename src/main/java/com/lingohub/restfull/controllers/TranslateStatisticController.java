package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.TranslateStatistic;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.TranslateStatisticService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/statistic")
public class TranslateStatisticController {
    private final AuthService authService;
    private final TranslateStatisticService translateStatisticService;

    public TranslateStatisticController(AuthService authService, TranslateStatisticService translateStatisticService) {
        this.authService = authService;
        this.translateStatisticService = translateStatisticService;
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getAllByUserId(@PathVariable("userId")int userId,
                                            HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            try {
                return new ResponseEntity<>(translateStatisticService.findAllByUserId(userId), HttpStatus.OK);
            } catch (Exception ex) {
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return authService.createUnauthorizedResponse();
    }
}
