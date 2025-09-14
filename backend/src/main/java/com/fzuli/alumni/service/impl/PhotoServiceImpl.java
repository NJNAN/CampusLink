package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.Photo;
import com.fzuli.alumni.repository.PhotoRepository;
import com.fzuli.alumni.service.PhotoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository repository;

    public PhotoServiceImpl(PhotoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Photo create(Photo photo) {
        return repository.save(photo);
    }

    @Override
    public List<Photo> findByAlbumId(Long albumId) {
        return repository.findAll().stream().filter(p -> p.getAlbum().getId().equals(albumId)).toList();
    }
}
