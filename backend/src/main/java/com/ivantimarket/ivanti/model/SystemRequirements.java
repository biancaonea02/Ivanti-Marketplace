package com.ivantimarket.ivanti.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemRequirements {
    private String processorType;
    private String ram;
    private String graphicsCard;
}
