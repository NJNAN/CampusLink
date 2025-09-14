package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.User;

import java.util.Optional;

public interface UserService {
    User register(User user);
    Optional<User> findByUsername(String username);
}
