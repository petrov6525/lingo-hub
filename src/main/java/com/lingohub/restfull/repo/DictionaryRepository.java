package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {

}
