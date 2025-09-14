package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Activity;

import java.util.List;
import java.util.Optional;

public interface ActivityService {
    Activity create(Activity activity);
    Optional<Activity> findById(Long id);
    List<Activity> findAll();
    void delete(Long id);
}
