package com.sparta.hanghaeblog.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentRequestDto {
    private String contents;
    private Long postId;
}
