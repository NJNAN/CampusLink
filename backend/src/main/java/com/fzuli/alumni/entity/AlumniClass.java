package com.fzuli.alumni.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "classes")
public class AlumniClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String major;

    @Column(nullable = false)
    private String grade;

    @Column(nullable = false)
    private Integer enrollmentYear;

    private Integer graduationYear;
    private String description;
    private String cover;
    private String motto;
    private Integer studentCount = 0;
    private LocalDateTime createTime = LocalDateTime.now();
}
