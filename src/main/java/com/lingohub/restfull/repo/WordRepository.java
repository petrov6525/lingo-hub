package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {

}
