package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.TranslateStatistic;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.TranslateStatisticService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistic")
public class TranslateStatisticController {
    private final AuthService authService;
    private final TranslateStatisticService translateStatisticService;

    public TranslateStatisticController(AuthService authService, TranslateStatisticService translateStatisticService) {
        this.authService = authService;
        this.translateStatisticService = translateStatisticService;
    }

}
