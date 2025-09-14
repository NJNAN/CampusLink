package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Message;

import java.util.List;

public interface MessageService {
    Message send(Message message);
    List<Message> inbox(Long userId);
}
