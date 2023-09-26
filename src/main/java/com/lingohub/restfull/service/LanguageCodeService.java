package com.lingohub.restfull.service;

import com.lingohub.restfull.exception.LanguageCodeNotFoundException;
import com.lingohub.restfull.factory.LanguageCodeFactory;
import com.lingohub.restfull.models.LanguageCode;
import com.lingohub.restfull.repo.LanguageCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageCodeService {
    private final LanguageCodeRepository languageCodeRepository;

    @Autowired
    public LanguageCodeService(LanguageCodeRepository languageCodeRepository) {
        this.languageCodeRepository = languageCodeRepository;
    }

    public LanguageCode create(LanguageCode code) {
        return languageCodeRepository.save(code);
    }

    public List<LanguageCode> findAll() {
        return languageCodeRepository.findAll();
    }

    public LanguageCode findById(int id) {
        return languageCodeRepository.findById(id)
                .orElseThrow(()->new LanguageCodeNotFoundException("Language code by id "+id+" not found"));
    }

    public LanguageCode findByCode(String code) {
        return languageCodeRepository.findByCode(code);
    }
}
