package com.lingohub.restfull.service;

import com.lingohub.restfull.exception.LogoNotFoundException;
import com.lingohub.restfull.models.Logo;
import com.lingohub.restfull.models.User;
import com.lingohub.restfull.repo.LogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

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
            String uuid = UUID.randomUUID().toString();
            String newFileName = uuid + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.FOLDER_PATH.resolve(Objects.requireNonNull(newFileName)));

            String path = FOLDER_PATH.resolve(newFileName).toString();

            Logo logo = new Logo();
            logo.setPath(path);
            logo.setName(newFileName);
            return logoRepository.save(logo);

        } catch (IOException e) {
            return e.getMessage();
        }

    }

    public byte[] downloadLogo(String name) throws IOException {
        Logo logo = logoRepository.findByName(name).orElseThrow(() -> new LogoNotFoundException("Logo not found"));

        return Files.readAllBytes(new File(logo.getPath()).toPath());
    }

    public List<Logo> findAllLogo() {
        return logoRepository.findAll();
    }

    public void deleteLogoIfExists(User user) throws IOException {
        if (user.getLogo() != null) {
            deleteLogoByPath(user.getLogo().getPath());
            Long logoId = user.getLogo().getId();
            user.setLogo(null);
            logoRepository.deleteById(logoId);
        }
    }

    private void deleteLogoByPath(String path) throws IOException {
        Path filePath = Paths.get(path);
        Files.deleteIfExists(filePath);
    }
}
