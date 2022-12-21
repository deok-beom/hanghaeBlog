package com.sparta.hanghaeblog.controller;

import com.sparta.hanghaeblog.dto.LoginRequestDto;
import com.sparta.hanghaeblog.dto.SignupRequestDto;
import com.sparta.hanghaeblog.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/author")
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping("/signup")
    public ModelAndView signupPage() {
        return new ModelAndView("signup");
    }

    @GetMapping("/login")
    public ModelAndView loginPage() {
        return new ModelAndView("login");
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity signup(@RequestBody @Valid SignupRequestDto signupRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            ObjectError objectError = bindingResult.getAllErrors().stream().findFirst().get();
            return new ResponseEntity<>(objectError.getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        try {
            authorService.signup(signupRequestDto);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("회원가입이 완료되었습니다.", HttpStatus.OK);
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        try {
            authorService.login(loginRequestDto, response);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("WELCOME", HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/home")
    public ResponseEntity isUser(HttpServletRequest request) {
        try {
            authorService.isUser(request);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
