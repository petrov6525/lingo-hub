package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface WordRepository extends JpaRepository<Word, Long> {

    Collection<? extends Word> findAllByDictionaryId(long id);
}
