package com.ivantimarket.ivanti.dto.packages;

import com.ivantimarket.ivanti.dto.user.UserDTO;
import com.ivantimarket.ivanti.model.SystemRequirements;
import com.ivantimarket.ivanti.model.Version;
import lombok.Data;

@Data
public class PackageOverviewDTO {

    private long id;
    private String title;
    private UserDTO creator;
    private String intro;
    private SystemRequirements systemRequirements;
    private Version latestVersion;
}
