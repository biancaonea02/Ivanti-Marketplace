package com.ivantimarket.ivanti.dto.user;

import com.ivantimarket.ivanti.model.Role;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String username;
    private String email;
}
