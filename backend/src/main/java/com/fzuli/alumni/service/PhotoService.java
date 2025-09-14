package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.Photo;

import java.util.List;

public interface PhotoService {
    Photo create(Photo photo);
    List<Photo> findByAlbumId(Long albumId);
}
