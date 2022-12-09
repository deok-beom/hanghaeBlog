package com.sparta.hanghaeblog.dto;

import lombok.Getter;

@Getter
public class PostRequestDto {
    private String author;
    private String title;
    private String contents;
}
