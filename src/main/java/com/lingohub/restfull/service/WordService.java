package com.lingohub.restfull.service;

import com.lingohub.restfull.helpers.TranslateHelper;
import com.lingohub.restfull.models.Word;
import com.lingohub.restfull.repo.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class WordService {
    private final WordRepository wordRepository;
    private final DictionaryService dictionaryService;


    @Autowired
    public WordService(WordRepository wordRepository, DictionaryService dictionaryService) {
        this.wordRepository = wordRepository;
        this.dictionaryService = dictionaryService;
    }

    public Word translate(Word word) {
        String translate = TranslateHelper.translate(word);
        word.setTranslate(translate);

        return word;
    }

    public Word addToDictionary(Word word) {
        word.setDictionary(dictionaryService.findById(word.getDictionary().getId()));
        return wordRepository.save(word);
    }

    public Object getCollection(Long[] dictionaries) {
        List<Word> words = new ArrayList<>();
        for (long id : dictionaries) {
            words.addAll(wordRepository.findAllByDictionaryId(id));
        }
        return words;
    }

    public Collection<? extends Word> findAllByDictionaryId(long dictionaryId) {
        return wordRepository.findAllByDictionaryId(dictionaryId);
    }
}
