package com.fzuli.alumni.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ElementCollection
    @CollectionTable(name = "post_images")
    private List<String> images;

    @Enumerated(EnumType.STRING)
    private PostType type;

    private String category;

    @ElementCollection
    @CollectionTable(name = "post_tags")
    private Set<String> tags;

    private Integer likes = 0;
    private Integer comments = 0;
    private Integer shares = 0;
    private Integer views = 0;

    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.PUBLISHED;

    private String location;
    private LocalDateTime createTime = LocalDateTime.now();
    private LocalDateTime updateTime = LocalDateTime.now();
}
