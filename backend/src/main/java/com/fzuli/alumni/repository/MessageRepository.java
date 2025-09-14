package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
