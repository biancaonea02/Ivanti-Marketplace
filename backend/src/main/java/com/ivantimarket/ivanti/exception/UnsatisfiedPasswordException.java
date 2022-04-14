package com.ivantimarket.ivanti.exception;

public class UnsatisfiedPasswordException extends RuntimeException{

    public UnsatisfiedPasswordException(String message){
        super(message);
    }
}
