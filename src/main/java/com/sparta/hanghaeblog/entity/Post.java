package com.sparta.hanghaeblog.entity;

import com.sparta.hanghaeblog.dto.PostRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Post extends Timestamped{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private Author author;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "POST_ID")
    private List<Comment> comments = new ArrayList<>();

    public Post(PostRequestDto requestDto, Author user) {
        this.author = user;
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }

    public void update(PostRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.contents = requestDto.getContents();
    }
}
