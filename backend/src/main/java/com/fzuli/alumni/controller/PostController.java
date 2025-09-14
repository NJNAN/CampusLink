package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.Post;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.PostService;
import com.fzuli.alumni.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<Post> create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Post post) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        post.setAuthor(user);
        return ApiResponse.success(postService.create(post));
    }

    @GetMapping
    public ApiResponse<List<Post>> list() {
        return ApiResponse.success(postService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<Post> get(@PathVariable Long id) {
        return ApiResponse.success(postService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found")));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ApiResponse.success(null);
    }
}
