package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.Activity;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.ActivityService;
import com.fzuli.alumni.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;
    private final UserService userService;

    public ActivityController(ActivityService activityService, UserService userService) {
        this.activityService = activityService;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<Activity> create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Activity activity) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        activity.setOrganizer(user);
        return ApiResponse.success(activityService.create(activity));
    }

    @GetMapping
    public ApiResponse<List<Activity>> list() {
        return ApiResponse.success(activityService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<Activity> get(@PathVariable Long id) {
        return ApiResponse.success(activityService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found")));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        activityService.delete(id);
        return ApiResponse.success(null);
    }
}
