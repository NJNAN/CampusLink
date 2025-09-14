package com.fzuli.alumni.repository;

import com.fzuli.alumni.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
}
