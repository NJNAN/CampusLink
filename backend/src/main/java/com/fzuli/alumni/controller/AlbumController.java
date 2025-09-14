package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.Album;
import com.fzuli.alumni.entity.Photo;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.AlbumService;
import com.fzuli.alumni.service.PhotoService;
import com.fzuli.alumni.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;
    private final PhotoService photoService;
    private final UserService userService;

    public AlbumController(AlbumService albumService, PhotoService photoService, UserService userService) {
        this.albumService = albumService;
        this.photoService = photoService;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<Album> create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Album album) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        album.setOwner(user);
        return ApiResponse.success(albumService.create(album));
    }

    @GetMapping
    public ApiResponse<List<Album>> list() {
        return ApiResponse.success(albumService.findAll());
    }

    @PostMapping("/{id}/photos")
    public ApiResponse<Photo> addPhoto(@PathVariable Long id, @RequestBody Photo photo) {
        Album album = albumService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));
        photo.setAlbum(album);
        return ApiResponse.success(photoService.create(photo));
    }

    @GetMapping("/{id}/photos")
    public ApiResponse<List<Photo>> photos(@PathVariable Long id) {
        return ApiResponse.success(photoService.findByAlbumId(id));
    }
}
