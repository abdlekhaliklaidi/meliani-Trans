package com.melianitrans.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequestDto {
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String recipientFirstName;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String recipientLastName;
    
    @NotBlank(message = "La ville d'expédition est obligatoire")
    private String shippingCity;
    
    @NotBlank(message = "La ville de livraison est obligatoire")
    private String deliveryCity;
    
    @NotBlank(message = "Le pays est obligatoire")
    private String country;
    
    @NotNull(message = "La date est obligatoire")
    private LocalDate shippingDate;
    
    private String currentStatus;
    private String currentLocation;
}
