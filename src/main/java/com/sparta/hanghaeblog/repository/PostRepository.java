package com.sparta.hanghaeblog.repository;

import com.sparta.hanghaeblog.entity.Post;
import com.sparta.hanghaeblog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAll();
}
