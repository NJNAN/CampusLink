package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {
    Post create(Post post);
    Optional<Post> findById(Long id);
    List<Post> findAll();
    void delete(Long id);
}
