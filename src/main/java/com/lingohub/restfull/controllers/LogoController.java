package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.Logo;
import com.lingohub.restfull.service.AuthService;
import com.lingohub.restfull.service.LogoService;
import com.lingohub.restfull.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/logo")
public class LogoController {
    private final UserService userService;
    private final LogoService logoService;
    private final AuthService authService;


    public LogoController(UserService userService, LogoService logoService, AuthService authService) {
        this.userService = userService;
        this.logoService = logoService;
        this.authService = authService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getLogoById(@PathVariable("id") long id, HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(logoService.getLogoById(id), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadLogo (@RequestParam("logo") MultipartFile file, HttpServletRequest request) throws IOException {
        if (authService.checkAuth(request)) {
            Object uploadedLogo = logoService.uploadLogo(file);
            return new ResponseEntity<>(uploadedLogo, HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> downloadLogoByName (@PathVariable("name")String name) throws IOException {
            try {
                byte[] logoBytes = logoService.downloadLogo(name);

                return ResponseEntity.status(HttpStatus.OK)
                        .contentType(MediaType.valueOf("image/png"))
                        .body(logoBytes);
            } catch (Exception exception) {
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAllLogo(HttpServletRequest request) {
        if (authService.checkAuth(request)) {
            return new ResponseEntity<>(logoService.findAllLogo(), HttpStatus.OK);
        }
        return authService.createUnauthorizedResponse();
    }

}
