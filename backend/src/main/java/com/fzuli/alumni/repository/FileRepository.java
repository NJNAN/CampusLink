package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
