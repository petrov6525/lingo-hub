package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    List<Dictionary> findAllByUserId(int userId);
}
