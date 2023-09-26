package com.lingohub.restfull.factory;

import com.lingohub.restfull.models.Dictionary;
import com.lingohub.restfull.service.DictionaryService;
import com.lingohub.restfull.service.LanguageCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DictionaryFactory {
    private final DictionaryService dictionaryService;
    private final LanguageCodeService languageCodeService;

    @Autowired
    public DictionaryFactory(DictionaryService dictionaryService, LanguageCodeService languageCodeService) {
        this.dictionaryService = dictionaryService;
        this.languageCodeService = languageCodeService;
    }

    public void run() {
        Dictionary dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(1));
        dictionary.setTranslateCode(languageCodeService.findById(2));
        dictionary.setName("Dictionary 1");
        Dictionary savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(1, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(2));
        dictionary.setTranslateCode(languageCodeService.findById(3));
        dictionary.setName("Dictionary 2");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(3));
        dictionary.setTranslateCode(languageCodeService.findById(4));
        dictionary.setName("Dictionary 3");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(2));
        dictionary.setTranslateCode(languageCodeService.findById(3));
        dictionary.setName("Dictionary 2");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(3));
        dictionary.setTranslateCode(languageCodeService.findById(4));
        dictionary.setName("Dictionary 3");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(2));
        dictionary.setTranslateCode(languageCodeService.findById(3));
        dictionary.setName("Dictionary 2");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(3));
        dictionary.setTranslateCode(languageCodeService.findById(4));
        dictionary.setName("Dictionary 3");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(2));
        dictionary.setTranslateCode(languageCodeService.findById(3));
        dictionary.setName("Dictionary 2");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());

        dictionary = new Dictionary();
        dictionary.setOriginCode(languageCodeService.findById(3));
        dictionary.setTranslateCode(languageCodeService.findById(4));
        dictionary.setName("Dictionary 3");
        savedDictionary = dictionaryService.create(dictionary);
        dictionaryService.addToUser(2, savedDictionary.getId());
    }
}
