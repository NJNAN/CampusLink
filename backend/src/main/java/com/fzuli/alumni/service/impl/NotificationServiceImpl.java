package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.Notification;
import com.fzuli.alumni.repository.NotificationRepository;
import com.fzuli.alumni.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public Notification create(Notification notification) {
        return repository.save(notification);
    }

    @Override
    public List<Notification> list(Long userId) {
        return repository.findAll().stream()
                .filter(n -> n.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }
}
