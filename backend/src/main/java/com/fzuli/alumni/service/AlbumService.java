package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Album;

import java.util.List;
import java.util.Optional;

public interface AlbumService {
    Album create(Album album);
    Optional<Album> findById(Long id);
    List<Album> findAll();
}
