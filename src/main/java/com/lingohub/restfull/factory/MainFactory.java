package com.lingohub.restfull.factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainFactory {
    private final LanguageCodeFactory languageCodeFactory;
    private final UserFactory userFactory;
    private final DictionaryFactory dictionaryFactory;

    @Autowired
    public MainFactory(LanguageCodeFactory languageCodeFactory, UserFactory userFactory, DictionaryFactory dictionaryFactory) {
        this.languageCodeFactory = languageCodeFactory;
        this.userFactory = userFactory;
        this.dictionaryFactory = dictionaryFactory;
    }

    public void run() {
        userFactory.run();
        languageCodeFactory.run();
        dictionaryFactory.run();
    }
}
