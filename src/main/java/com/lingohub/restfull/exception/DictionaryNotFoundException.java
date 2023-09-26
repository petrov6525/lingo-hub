package com.lingohub.restfull.exception;

public class DictionaryNotFoundException extends RuntimeException{
    public DictionaryNotFoundException(String message) {
        super(message);
    }
}
