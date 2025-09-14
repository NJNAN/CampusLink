package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.FileEntity;
import com.fzuli.alumni.repository.FileRepository;
import com.fzuli.alumni.service.FileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository repository;

    public FileServiceImpl(FileRepository repository) {
        this.repository = repository;
    }

    @Override
    public FileEntity save(FileEntity file) {
        return repository.save(file);
    }

    @Override
    public List<FileEntity> list() {
        return repository.findAll();
    }
}
