package com.ivantimarket.ivanti.dto.packages;

import com.ivantimarket.ivanti.dto.user.UserDTO;
import com.ivantimarket.ivanti.model.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewPackageDTO {

    private long id;
    private String title;
    private long creatorId;
    private String intro;
}