package com.lingohub.restfull.service;

import com.lingohub.restfull.exception.LogoNotFoundException;
import com.lingohub.restfull.models.Logo;
import com.lingohub.restfull.repo.LogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class LogoService {
    private final LogoRepository logoRepository;
    private final Path FOLDER_PATH = Paths.get("uploads");

    @Autowired
    public LogoService(LogoRepository logoRepository) {
        this.logoRepository = logoRepository;
    }

    public Logo getLogoById(Long id) {
        return logoRepository.findById(id)
                .orElseThrow(() -> new LogoNotFoundException("Logo by id " + id + " not found"));
    }

    public Object uploadLogo(MultipartFile file) {
        try {
            Files.createDirectories(FOLDER_PATH);
            Files.copy(file.getInputStream(), this.FOLDER_PATH.resolve(Objects.requireNonNull(file.getOriginalFilename())));

            String path = FOLDER_PATH.resolve(file.getOriginalFilename()).toString();

            Logo logo = new Logo();
            logo.setPath(path);
            logo.setName(file.getOriginalFilename());
            return logoRepository.save(logo);

        } catch (IOException e) {
            return e.getMessage();
        }

    }

    public byte[] downloadLogo(String name) throws IOException {
        Logo logo = logoRepository.findByName(name).orElseThrow(()-> new LogoNotFoundException("Logo not found"));

        return Files.readAllBytes(new File(logo.getPath()).toPath());
    }
}
