package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
}
