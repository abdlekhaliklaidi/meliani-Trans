package com.melianitrans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipment_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "shipping_city", nullable = false)
    private String shippingCity;
    
    @Column(name = "delivery_city", nullable = false)
    private String deliveryCity;
    
    @Column(nullable = false)
    private String country;
    
    @Column(name = "shipping_date", nullable = false)
    private LocalDate shippingDate;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "additional_info")
    private String additionalInfo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus requestStatus = RequestStatus.EN_ATTENTE;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum RequestStatus {
        EN_ATTENTE,
        EN_TRAITEMENT,
        CONFIRME,
        REFUSE
    }
}
