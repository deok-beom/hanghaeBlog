package com.sparta.hanghaeblog.entity;

import com.sparta.hanghaeblog.dto.CommentRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
public class Comment extends Timestamped{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String contents;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private Author author;

    @ManyToOne
    @JoinColumn(name = "POST_ID", nullable = false)
    private Post post;

    public Comment(CommentRequestDto commentRequestDto, Author author, Post post) {
        this.contents = commentRequestDto.getContents();
        this.author = author;
        this.post = post;
    }

    public void update(CommentRequestDto requestDto) {
        this.contents = requestDto.getContents();
    }
}
