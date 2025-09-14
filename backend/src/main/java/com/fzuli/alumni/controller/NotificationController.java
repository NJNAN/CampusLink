package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.Notification;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.NotificationService;
import com.fzuli.alumni.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;
    private final UserService userService;

    public NotificationController(NotificationService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<Notification> create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Notification notification) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        notification.setUser(user);
        return ApiResponse.success(service.create(notification));
    }

    @GetMapping
    public ApiResponse<List<Notification>> list(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ApiResponse.success(service.list(user.getId()));
    }
}
