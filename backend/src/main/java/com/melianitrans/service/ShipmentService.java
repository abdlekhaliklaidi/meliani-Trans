package com.melianitrans.service;

import com.melianitrans.dto.*;
import com.melianitrans.entity.Shipment;
import com.melianitrans.entity.ShipmentStatusHistory;
import com.melianitrans.repository.ShipmentRepository;
import com.melianitrans.repository.ShipmentStatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShipmentService {

    @Autowired
    private ShipmentRepository shipmentRepository;

    @Autowired
    private ShipmentStatusHistoryRepository statusHistoryRepository;

    // =============================================
    // CREATE
    // =============================================
    @Transactional
    public ShipmentResponseDto createShipment(ShipmentRequestDto dto) {
        Shipment shipment = new Shipment();

        if (dto.getTrackingNumber() != null && !dto.getTrackingNumber().isBlank()) {
            shipment.setTrackingNumber(dto.getTrackingNumber());
        }

        shipment.setSenderFirstName(dto.getSenderFirstName());
        shipment.setSenderLastName(dto.getSenderLastName());
        shipment.setRecipientFirstName(dto.getRecipientFirstName());
        shipment.setRecipientLastName(dto.getRecipientLastName());
        shipment.setPackageType(dto.getPackageType());
        shipment.setWeight(dto.getWeight());
        shipment.setShippingCity(dto.getShippingCity());
        shipment.setDeliveryCity(dto.getDeliveryCity());
        shipment.setCountry(dto.getCountry());
        shipment.setShippingDate(dto.getShippingDate());
        shipment.setPhone(dto.getPhone());
        shipment.setCurrentStatus("En préparation");
        shipment.setCurrentLocation(dto.getShippingCity());
        shipment.setStatus(Shipment.Status.EN_PREPARATION);

        Shipment saved = shipmentRepository.save(shipment);
        addStatusHistory(saved, "En préparation", dto.getShippingCity(),
                "Colis enregistré à l'agence de départ");

        return mapToResponseDto(saved);
    }

    // =============================================
    // READ ALL
    // =============================================
    @Transactional(readOnly = true)
    public List<ShipmentResponseDto> getAllShipments() {
        return shipmentRepository.findAllOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    // =============================================
    // READ ONE
    // =============================================
    @Transactional(readOnly = true)
    public ShipmentResponseDto getShipmentById(Long id) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));
        return mapToResponseDto(shipment);
    }

    // =============================================
    // TRACK
    // =============================================
    @Transactional(readOnly = true)
    public TrackingResponse trackShipment(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .map(shipment -> TrackingResponse.builder()
                        .found(true)
                        .trackingNumber(shipment.getTrackingNumber())
                        .recipientFullName(shipment.getRecipientFirstName() + " " + shipment.getRecipientLastName())
                        .shippingCity(shipment.getShippingCity())
                        .deliveryCity(shipment.getDeliveryCity())
                        .country(shipment.getCountry())
                        .shippingDate(shipment.getShippingDate())
                        .currentStatus(shipment.getCurrentStatus())
                        .currentLocation(shipment.getCurrentLocation())
                        .status(shipment.getStatus())
                        .statusHistory(shipment.getStatusHistory().stream()
                                .map(this::mapToStatusHistoryDto)
                                .collect(Collectors.toList()))
                        .lastUpdated(shipment.getUpdatedAt())
                        .message("Colis trouvé")
                        .build())
                .orElse(TrackingResponse.builder()
                        .found(false)
                        .trackingNumber(trackingNumber)
                        .message("Aucun colis trouvé avec ce numéro de suivi")
                        .build());
    }

    // =============================================
    // UPDATE
    // =============================================
    @Transactional
    public ShipmentResponseDto updateShipment(Long id, ShipmentRequestDto dto) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));

        if (dto.getTrackingNumber() != null && !dto.getTrackingNumber().isBlank()) {
            shipment.setTrackingNumber(dto.getTrackingNumber());
        }
        shipment.setSenderFirstName(dto.getSenderFirstName());
        shipment.setSenderLastName(dto.getSenderLastName());
        shipment.setRecipientFirstName(dto.getRecipientFirstName());
        shipment.setRecipientLastName(dto.getRecipientLastName());
        shipment.setPackageType(dto.getPackageType());
        shipment.setWeight(dto.getWeight());
        shipment.setShippingCity(dto.getShippingCity());
        shipment.setDeliveryCity(dto.getDeliveryCity());
        shipment.setCountry(dto.getCountry());
        shipment.setPhone(dto.getPhone());
        shipment.setShippingDate(dto.getShippingDate());

        return mapToResponseDto(shipmentRepository.save(shipment));
    }

    // =============================================
    // UPDATE STATUS
    // =============================================
    @Transactional
    public ShipmentResponseDto updateStatus(Long id, StatusUpdateRequest request) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));

        shipment.setCurrentStatus(request.getStatus());
        shipment.setCurrentLocation(request.getLocation());

        try {
            Shipment.Status newStatus = Shipment.Status.valueOf(
                    request.getStatus().toUpperCase().replace(" ", "_"));
            shipment.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            // Garde le statut enum existant si la conversion échoue
        }

        addStatusHistory(shipment, request.getStatus(),
                request.getLocation(), request.getDescription());

        return mapToResponseDto(shipmentRepository.save(shipment));
    }

    // =============================================
    // DELETE
    // =============================================
    @Transactional
    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }

    // =============================================
    // STATS
    // =============================================
    @Transactional(readOnly = true)
    public long countAllShipments() {
        return shipmentRepository.countAllShipments();
    }

    @Transactional(readOnly = true)
    public long countDeliveredShipments() {
        return shipmentRepository.countDeliveredShipments();
    }

    @Transactional(readOnly = true)
    public long countInTransitShipments() {
        return shipmentRepository.countInTransitShipments();
    }

    // =============================================
    // PRIVATE HELPERS
    // =============================================
    private void addStatusHistory(Shipment shipment, String status,
                                   String location, String description) {
        ShipmentStatusHistory history = new ShipmentStatusHistory();
        history.setShipment(shipment);
        history.setStatus(status);
        history.setLocation(location);
        history.setDescription(description != null ? description : "Mise à jour du statut");
        statusHistoryRepository.save(history);
    }

    private ShipmentResponseDto mapToResponseDto(Shipment shipment) {
        return ShipmentResponseDto.builder()
                .id(shipment.getId())
                .trackingNumber(shipment.getTrackingNumber())
                .senderFirstName(shipment.getSenderFirstName())
                .senderLastName(shipment.getSenderLastName())
                .recipientFirstName(shipment.getRecipientFirstName())
                .recipientLastName(shipment.getRecipientLastName())
                .recipientFullName(shipment.getRecipientFirstName()
                        + " " + shipment.getRecipientLastName())
                .packageType(shipment.getPackageType())
                .weight(shipment.getWeight())
                .shippingCity(shipment.getShippingCity())
                .deliveryCity(shipment.getDeliveryCity())
                .country(shipment.getCountry())
                .shippingDate(shipment.getShippingDate())
                .currentStatus(shipment.getCurrentStatus())
                .currentLocation(shipment.getCurrentLocation())
                .phone(shipment.getPhone())
                .status(shipment.getStatus())
                .statusHistory(shipment.getStatusHistory().stream()
                        .map(this::mapToStatusHistoryDto)
                        .collect(Collectors.toList()))
                .createdAt(shipment.getCreatedAt())
                .updatedAt(shipment.getUpdatedAt())
                .build();
    }

    private ShipmentStatusHistoryDto mapToStatusHistoryDto(ShipmentStatusHistory history) {
        return ShipmentStatusHistoryDto.builder()
                .id(history.getId())
                .status(history.getStatus())
                .location(history.getLocation())
                .description(history.getDescription())
                .timestamp(history.getTimestamp())
                .build();
    }
}