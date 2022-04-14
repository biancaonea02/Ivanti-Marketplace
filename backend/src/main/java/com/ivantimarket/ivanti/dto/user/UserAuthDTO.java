package com.ivantimarket.ivanti.dto.user;

import com.ivantimarket.ivanti.model.Role;
import lombok.Data;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
public class UserAuthDTO {
    private long id;
    private String name;
    private String username;
    private String email;
    private Set<Role> roles = new HashSet<>();
    private Map<String, String> tokens;
}
