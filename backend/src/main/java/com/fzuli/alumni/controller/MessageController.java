package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.Message;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.MessageService;
import com.fzuli.alumni.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<Message> send(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Message message) {
        User sender = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        message.setSender(sender);
        return ApiResponse.success(messageService.send(message));
    }

    @GetMapping
    public ApiResponse<List<Message>> inbox(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ApiResponse.success(messageService.inbox(user.getId()));
    }
}
