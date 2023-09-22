package com.lingohub.restfull.service;


import com.lingohub.restfull.models.Dictionary;
import com.lingohub.restfull.repo.DictionaryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService {
    private final DictionaryRepository dictionaryRepository;
    private final UserService userService;

    public DictionaryService(DictionaryRepository dictionaryRepository, UserService userService) {
        this.dictionaryRepository = dictionaryRepository;
        this.userService = userService;
    }

    public Object create (Dictionary dictionary) {
        try {
            return dictionaryRepository.save(dictionary);
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

    public ResponseEntity<?> createResponseByDictionary(Object object) {
        if (object instanceof Dictionary) {
            return new ResponseEntity<>(object, HttpStatus.OK);
        }

        return new ResponseEntity<>(object, HttpStatus.BAD_REQUEST);
    }
}
