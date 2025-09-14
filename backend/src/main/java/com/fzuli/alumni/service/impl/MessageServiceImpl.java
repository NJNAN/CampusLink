package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.Message;
import com.fzuli.alumni.repository.MessageRepository;
import com.fzuli.alumni.service.MessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository repository;

    public MessageServiceImpl(MessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public Message send(Message message) {
        return repository.save(message);
    }

    @Override
    public List<Message> inbox(Long userId) {
        return repository.findAll().stream()
                .filter(m -> m.getReceiver().getId().equals(userId))
                .collect(Collectors.toList());
    }
}
