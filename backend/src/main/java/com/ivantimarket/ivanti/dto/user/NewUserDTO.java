package com.ivantimarket.ivanti.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewUserDTO {

    private long id;
    private String name;
    private String username;
    private String password;
    private String email;
    private String roleName;
}
