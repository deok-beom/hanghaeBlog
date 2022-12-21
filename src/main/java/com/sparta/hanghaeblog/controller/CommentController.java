package com.sparta.hanghaeblog.controller;

import com.sparta.hanghaeblog.dto.CommentRequestDto;
import com.sparta.hanghaeblog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comments")
    @ResponseBody
    public ResponseEntity addComment(@RequestBody CommentRequestDto requestDto, HttpServletRequest request) {
        try {
            commentService.addComment(requestDto, request);
            return new ResponseEntity<>("댓글 등록이 완료되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/comments/{id}")
    @ResponseBody
    public ResponseEntity updateComment(@PathVariable Long id, @RequestBody CommentRequestDto requestDto, HttpServletRequest request) {
        try {
            commentService.update(id, requestDto, request);
            return new ResponseEntity<>("댓글 수정이 완료되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/comments/{id}")
    @ResponseBody
    public ResponseEntity deleteComment(@PathVariable Long id, HttpServletRequest request) {
        try {
            commentService.delete(id, request);
            return new ResponseEntity<>("삭제되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }
}
