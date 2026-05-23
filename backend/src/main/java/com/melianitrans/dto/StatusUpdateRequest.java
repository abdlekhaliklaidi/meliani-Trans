package com.melianitrans.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusUpdateRequest {
    
    @NotBlank(message = "Le statut est obligatoire")
    private String status;
    
    @NotBlank(message = "La localisation est obligatoire")
    private String location;
    
    private String description;
}
