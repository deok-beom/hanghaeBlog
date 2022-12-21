package com.sparta.hanghaeblog.service;

import com.sparta.hanghaeblog.dto.CommentRequestDto;
import com.sparta.hanghaeblog.dto.CommentResponseDto;
import com.sparta.hanghaeblog.dto.PostResponseDto;
import com.sparta.hanghaeblog.entity.Author;
import com.sparta.hanghaeblog.entity.Comment;
import com.sparta.hanghaeblog.entity.Post;
import com.sparta.hanghaeblog.entity.UserRoleEnum;
import com.sparta.hanghaeblog.jwt.JwtUtil;
import com.sparta.hanghaeblog.repository.AuthorRepository;
import com.sparta.hanghaeblog.repository.CommentRepository;
import com.sparta.hanghaeblog.repository.PostRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final AuthorRepository  authorRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public CommentResponseDto addComment(CommentRequestDto requestDto, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        Claims claims;

        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                claims = jwtUtil.getUserInfoFromToken(token);
            } else {
                throw new IllegalArgumentException("사용자가 올바르지 않습니다.");
            }

            Author user = authorRepository.findByName(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Post post = postRepository.findById(requestDto.getPostId()).orElseThrow(
                    () -> new IllegalArgumentException("게시글이 존재하지 않습니다.")
            );

            Comment comment = new Comment(requestDto, user, post);
            commentRepository.saveAndFlush(comment);

            return new CommentResponseDto(comment);
        } else {
            return null;
        }
    }

    @Transactional
    public Long update(Long id, CommentRequestDto requestDto, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        Claims claims;

        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                claims = jwtUtil.getUserInfoFromToken(token);
            } else {
                throw new IllegalArgumentException("사용자가 올바르지 않습니다.");
            }

            Author user = authorRepository.findByName(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Optional<Comment> comment = commentRepository.findById(id);
            if (!comment.isPresent()) {
                throw new IllegalArgumentException("댓글을 찾을 수 없습니다.");
            }

            if (comment.get().getAuthor().getId().equals(user.getId()) || user.getRole() == UserRoleEnum.ADMIN) {
                comment.get().update(requestDto);
                return comment.get().getId();
            } else {
                throw new IllegalArgumentException("권한이 없습니다.");
            }
        }

        return id;
    }

    public Long delete(Long id, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        Claims claims;

        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                claims = jwtUtil.getUserInfoFromToken(token);
            } else {
                throw new IllegalArgumentException("사용자가 올바르지 않습니다.");
            }

            Author user = authorRepository.findByName(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Optional<Comment> comment = commentRepository.findById(id);
            if (!comment.isPresent()) {
                throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
            }

            if (comment.get().getAuthor().getId().equals(user.getId()) || user.getRole() == UserRoleEnum.ADMIN) {
                commentRepository.deleteById(id);
                return comment.get().getId();
            } else {
                throw new IllegalArgumentException("권한이 없습니다.");
            }
        }

        return id;
    }
}
