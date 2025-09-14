package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
