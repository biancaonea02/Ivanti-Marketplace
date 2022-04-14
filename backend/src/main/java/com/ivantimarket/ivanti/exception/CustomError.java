package com.ivantimarket.ivanti.exception;

public class CustomError {

    private String error_message;

    public CustomError() {

    }

    public CustomError(String error) {
        this.error_message = error;
    }

    public String getError() {
        return error_message;
    }

    public void setError(String error) {
        this.error_message = error;
    }
}
