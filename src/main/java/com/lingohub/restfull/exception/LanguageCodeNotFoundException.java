package com.lingohub.restfull.exception;

public class LanguageCodeNotFoundException extends RuntimeException{
    public LanguageCodeNotFoundException(String message) {
        super(message);
    }
}
