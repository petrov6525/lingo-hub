package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.LanguageCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageCodeRepository extends JpaRepository<LanguageCode, Integer> {
    LanguageCode findByCode(String code);
}
