package com.ivantimarket.ivanti.model;

import com.ivantimarket.ivanti.dto.user.UserDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "packages")
@Getter
@Setter
public class Package {

    @Transient
    public static final String SEQUENCE_NAMEE = "packages_sequence";

    @Id
    private long id;
    private String title;
    private UserDTO creator;
    private String intro;
    private SystemRequirements systemRequirements;
    private List<Version> versions = new ArrayList<>();
}
