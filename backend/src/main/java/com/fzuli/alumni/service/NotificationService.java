package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification create(Notification notification);
    List<Notification> list(Long userId);
}
