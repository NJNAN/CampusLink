package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.FileEntity;

import java.util.List;

public interface FileService {
    FileEntity save(FileEntity file);
    List<FileEntity> list();
}
