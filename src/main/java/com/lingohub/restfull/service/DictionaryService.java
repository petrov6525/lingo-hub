package com.lingohub.restfull.service;


import com.lingohub.restfull.exception.DictionaryNotFoundException;
import com.lingohub.restfull.models.Dictionary;
import com.lingohub.restfull.models.User;
import com.lingohub.restfull.repo.DictionaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryService {
    private final DictionaryRepository dictionaryRepository;
    private final UserService userService;
    private final LanguageCodeService languageCodeService;

    @Autowired
    public DictionaryService(DictionaryRepository dictionaryRepository, UserService userService, LanguageCodeService languageCodeService) {
        this.dictionaryRepository = dictionaryRepository;
        this.userService = userService;
        this.languageCodeService = languageCodeService;
    }

    public Object create(Dictionary dictionary) {
        try {
            dictionary.setOriginCode(languageCodeService.findById(dictionary.getOriginCode().getId()));
            dictionary.setTranslateCode(languageCodeService.findById(dictionary.getTranslateCode().getId()));
            return dictionaryRepository.save(dictionary);
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

    public Dictionary findById(Long id)  {
        return dictionaryRepository.findById(id)
                .orElseThrow(()-> new DictionaryNotFoundException("Dictionary by id "+id+" not found"));
    }


    public List<Dictionary> addToUser(int userId, Long dictionaryId)  {
        User user = userService.findUserById(userId);
        Dictionary dictionary = findById(dictionaryId);
        dictionary.setUser(user);
        dictionaryRepository.save(dictionary);

        return dictionaryRepository.findAllByUserId(userId);
    }


    public List<Dictionary> getAllByUserId(int userId) {
        return dictionaryRepository.findAllByUserId(userId);
    }
}




