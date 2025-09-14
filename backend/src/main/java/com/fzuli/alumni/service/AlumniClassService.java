package com.fzuli.alumni.service;

import com.fzuli.alumni.entity.AlumniClass;

import java.util.List;
import java.util.Optional;

public interface AlumniClassService {
    AlumniClass create(AlumniClass cls);
    Optional<AlumniClass> findById(Long id);
    List<AlumniClass> findAll();
    void delete(Long id);
}
