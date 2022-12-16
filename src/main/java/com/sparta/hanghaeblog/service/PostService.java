package com.sparta.hanghaeblog.service;

import com.sparta.hanghaeblog.dto.PostRequestDto;
import com.sparta.hanghaeblog.dto.PostResponseDto;
import com.sparta.hanghaeblog.entity.Post;
import com.sparta.hanghaeblog.entity.User;
import com.sparta.hanghaeblog.entity.UserRoleEnum;
import com.sparta.hanghaeblog.jwt.JwtUtil;
import com.sparta.hanghaeblog.repository.PostRepository;
import com.sparta.hanghaeblog.repository.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public PostResponseDto createPost(PostRequestDto requestDto, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        Claims claims;

        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                claims = jwtUtil.getUserInfoFromToken(token);
            } else {
                throw new IllegalArgumentException("사용자가 올바르지 않습니다.");
            }

            User user = userRepository.findByUsername(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Post post = new Post(requestDto, user);
            postRepository.saveAndFlush(post);

            return new PostResponseDto(post);
        } else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public List<PostResponseDto> getPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDto> responseDtos = new ArrayList<>();
        for (Post post : posts) {
            PostResponseDto dto = new PostResponseDto(post);
            responseDtos.add(dto);
        }
        return responseDtos;
    }

    @Transactional
    public Long update(Long id, PostRequestDto requestDto, HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        Claims claims;

        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                claims = jwtUtil.getUserInfoFromToken(token);
            } else {
                throw new IllegalArgumentException("사용자가 올바르지 않습니다.");
            }

            User user = userRepository.findByUsername(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Optional<Post> post = postRepository.findById(id);
            if (!post.isPresent()) {
                throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
            }

            if (post.get().getAuthor().getId().equals(user.getId()) || user.getRole() == UserRoleEnum.ADMIN) {
                post.get().update(requestDto);
                return post.get().getId();
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

            User user = userRepository.findByUsername(claims.getSubject()).orElseThrow(
                    () -> new IllegalArgumentException("사용자가 존재하지 않습니다.")
            );

            Optional<Post> post = postRepository.findById(id);
            if (!post.isPresent()) {
                throw new IllegalArgumentException("게시글을 찾을 수 없습니다.");
            }

            if (post.get().getAuthor().getId().equals(user.getId()) || user.getRole() == UserRoleEnum.ADMIN) {
                postRepository.deleteById(id);
                return post.get().getId();
            } else {
                throw new IllegalArgumentException("권한이 없습니다.");
            }
        }

        return id;
    }

    public PostResponseDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );

        return new PostResponseDto(post);
    }
}
