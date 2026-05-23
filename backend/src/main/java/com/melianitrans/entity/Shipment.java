package com.melianitrans.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shipments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shipment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tracking_number", unique = true, nullable = false)
    private String trackingNumber;
    
    @Column(name = "recipient_first_name", nullable = false)
    private String recipientFirstName;
    
    @Column(name = "recipient_last_name", nullable = false)
    private String recipientLastName;
    
    @Column(name = "shipping_city", nullable = false)
    private String shippingCity;
    
    @Column(name = "delivery_city", nullable = false)
    private String deliveryCity;
    
    @Column(nullable = false)
    private String country;
    
    @Column(name = "shipping_date", nullable = false)
    private LocalDate shippingDate;
    
    @Column(name = "current_status")
    private String currentStatus;
    
    @Column(name = "current_location")
    private String currentLocation;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.EN_PREPARATION;
    
    @OneToMany(mappedBy = "shipment", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("timestamp DESC")
    private List<ShipmentStatusHistory> statusHistory = new ArrayList<>();
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (trackingNumber == null || trackingNumber.isEmpty()) {
            trackingNumber = generateTrackingNumber();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    private String generateTrackingNumber() {
        return "MT" + System.currentTimeMillis() + (int)(Math.random() * 1000);
    }
    
    public enum Status {
        EN_PREPARATION,
        EN_AGENCE_DEPART,
        EN_TRANSIT,
        ARRIVEE_INTERMEDIAIRE,
        EN_AGENCE_ARRIVEE,
        EN_LIVRAISON,
        LIVRE,
        ANNULE
    }
}
