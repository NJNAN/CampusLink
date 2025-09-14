package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
