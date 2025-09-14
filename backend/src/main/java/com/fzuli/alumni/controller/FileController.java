package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.FileEntity;
import com.fzuli.alumni.entity.User;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.FileService;
import com.fzuli.alumni.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;
    private final UserService userService;

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    public FileController(FileService fileService, UserService userService) {
        this.fileService = fileService;
        this.userService = userService;
    }

    @PostMapping
    public ApiResponse<FileEntity> upload(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("file") MultipartFile file) throws IOException {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        String filename = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        Path path = Paths.get(uploadDir, filename);
        Files.createDirectories(path.getParent());
        file.transferTo(path);
        FileEntity fe = new FileEntity();
        fe.setName(filename);
        fe.setUrl(path.toString());
        fe.setContentType(file.getContentType());
        fe.setSize(file.getSize());
        fe.setUploader(user);
        return ApiResponse.success(fileService.save(fe));
    }

    @GetMapping
    public ApiResponse<List<FileEntity>> list() {
        return ApiResponse.success(fileService.list());
    }
}
