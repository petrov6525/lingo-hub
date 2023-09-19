package com.lingohub.restfull.controllers;

import com.lingohub.restfull.models.Logo;
import com.lingohub.restfull.service.LogoService;
import com.lingohub.restfull.service.UserService;
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


    public LogoController(UserService userService, LogoService logoService) {
        this.userService = userService;
        this.logoService = logoService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Logo> getLogoById(@PathVariable("id") long id) {
        return new ResponseEntity<>(logoService.getLogoById(id), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadLogo (@RequestParam("logo") MultipartFile file) throws IOException {
        Object uploadedLogo = logoService.uploadLogo(file);

        return new ResponseEntity<>(uploadedLogo, HttpStatus.OK);
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
}
