package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.Album;
import com.fzuli.alumni.repository.AlbumRepository;
import com.fzuli.alumni.service.AlbumService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository repository;

    public AlbumServiceImpl(AlbumRepository repository) {
        this.repository = repository;
    }

    @Override
    public Album create(Album album) {
        return repository.save(album);
    }

    @Override
    public Optional<Album> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Album> findAll() {
        return repository.findAll();
    }
}
