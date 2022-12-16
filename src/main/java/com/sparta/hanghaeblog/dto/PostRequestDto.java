package com.sparta.hanghaeblog.dto;

import com.sparta.hanghaeblog.entity.User;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class PostRequestDto {
    private String title;
    private String contents;
}
