package com.fzuli.alumni.service.impl;

import com.fzuli.alumni.entity.AlumniClass;
import com.fzuli.alumni.repository.AlumniClassRepository;
import com.fzuli.alumni.service.AlumniClassService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumniClassServiceImpl implements AlumniClassService {

    private final AlumniClassRepository repository;

    public AlumniClassServiceImpl(AlumniClassRepository repository) {
        this.repository = repository;
    }

    @Override
    public AlumniClass create(AlumniClass cls) {
        return repository.save(cls);
    }

    @Override
    public Optional<AlumniClass> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<AlumniClass> findAll() {
        return repository.findAll();
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
