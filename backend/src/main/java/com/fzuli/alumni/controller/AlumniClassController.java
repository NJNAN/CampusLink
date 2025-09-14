package com.fzuli.alumni.controller;

import com.fzuli.alumni.dto.ApiResponse;
import com.fzuli.alumni.entity.AlumniClass;
import com.fzuli.alumni.exception.ResourceNotFoundException;
import com.fzuli.alumni.service.AlumniClassService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class AlumniClassController {

    private final AlumniClassService service;

    public AlumniClassController(AlumniClassService service) {
        this.service = service;
    }

    @PostMapping
    public ApiResponse<AlumniClass> create(@RequestBody AlumniClass cls) {
        return ApiResponse.success(service.create(cls));
    }

    @GetMapping
    public ApiResponse<List<AlumniClass>> list() {
        return ApiResponse.success(service.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<AlumniClass> get(@PathVariable Long id) {
        return ApiResponse.success(service.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found")));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ApiResponse.success(null);
    }
}
