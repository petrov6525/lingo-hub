package com.lingohub.restfull.exception;

import com.lingohub.restfull.models.Logo;

public class LogoNotFoundException extends RuntimeException{
    public LogoNotFoundException(String message) {
        super(message);
    }
}
