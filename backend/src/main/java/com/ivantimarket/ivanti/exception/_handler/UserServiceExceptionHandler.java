package com.ivantimarket.ivanti.exception._handler;


import com.ivantimarket.ivanti.exception.CustomError;
import com.ivantimarket.ivanti.exception.UnsatisfiedPasswordException;
import com.ivantimarket.ivanti.exception.UserAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
@Slf4j
public class UserServiceExceptionHandler {

    @ResponseBody
    @ExceptionHandler({UserAlreadyExistsException.class, UnsatisfiedPasswordException.class})
    @ResponseStatus(BAD_REQUEST)
    public CustomError handle(Exception ex){return new CustomError(ex.getMessage()); }


}
