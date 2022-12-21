package com.sparta.hanghaeblog.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class BlogController {

    @GetMapping("/home")
    public ModelAndView home() {
        return new ModelAndView("index");
    }

    @GetMapping("/detail")
    public ModelAndView detailPage() {
        return new ModelAndView("detail");
    }
}
