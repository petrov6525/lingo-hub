package com.lingohub.restfull.service;

import com.lingohub.restfull.helpers.TranslateHelper;
import com.lingohub.restfull.models.Word;
import com.lingohub.restfull.repo.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WordService {
    private final WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public Object translate(Word word) {
        return TranslateHelper.translate(word);
    }
}
