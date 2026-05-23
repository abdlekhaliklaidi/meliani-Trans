package com.melianitrans.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentClientRequestDto {
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String firstName;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String lastName;
    
    @NotBlank(message = "La ville d'expédition est obligatoire")
    private String shippingCity;
    
    @NotBlank(message = "La ville de livraison est obligatoire")
    private String deliveryCity;
    
    @NotBlank(message = "Le pays est obligatoire")
    private String country;
    
    @NotNull(message = "La date est obligatoire")
    private LocalDate shippingDate;
    
    private String phone;
    
    @Email(message = "L'email doit être valide")
    private String email;
    
    private String additionalInfo;
}
