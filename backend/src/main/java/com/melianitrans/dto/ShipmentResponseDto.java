package com.melianitrans.dto;

import com.melianitrans.entity.Shipment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentResponseDto {

    private Long id;
    private String trackingNumber;

    // ✅ Expéditeur
    private String senderFirstName;
    private String senderLastName;

    // Destinataire
    private String recipientFirstName;
    private String recipientLastName;
    private String recipientFullName;

    // ✅ Informations colis
    private String packageType;
    private Double weight;

    private String shippingCity;
    private String deliveryCity;
    private String country;
    private LocalDate shippingDate;
    private String currentStatus;
    private String currentLocation;
    private Shipment.Status status;
    private List<ShipmentStatusHistoryDto> statusHistory;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String phone;
}