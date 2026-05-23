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

    @Transactional
    public ShipmentResponseDto createShipment(ShipmentRequestDto requestDto) {
        Shipment shipment = new Shipment();
        shipment.setRecipientFirstName(requestDto.getRecipientFirstName());
        shipment.setRecipientLastName(requestDto.getRecipientLastName());
        shipment.setShippingCity(requestDto.getShippingCity());
        shipment.setDeliveryCity(requestDto.getDeliveryCity());
        shipment.setCountry(requestDto.getCountry());
        shipment.setShippingDate(requestDto.getShippingDate());
        shipment.setCurrentStatus("En préparation");
        shipment.setCurrentLocation(requestDto.getShippingCity());
        shipment.setStatus(Shipment.Status.EN_PREPARATION);

        Shipment saved = shipmentRepository.save(shipment);

        // Add initial status history
        addStatusHistory(saved, "En préparation", requestDto.getShippingCity(), 
                "Colis enregistré à l'agence de départ");

        return mapToResponseDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ShipmentResponseDto> getAllShipments() {
        return shipmentRepository.findAllOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ShipmentResponseDto getShipmentById(Long id) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));
        return mapToResponseDto(shipment);
    }

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

    @Transactional
    public ShipmentResponseDto updateShipment(Long id, ShipmentRequestDto requestDto) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));

        shipment.setRecipientFirstName(requestDto.getRecipientFirstName());
        shipment.setRecipientLastName(requestDto.getRecipientLastName());
        shipment.setShippingCity(requestDto.getShippingCity());
        shipment.setDeliveryCity(requestDto.getDeliveryCity());
        shipment.setCountry(requestDto.getCountry());
        shipment.setShippingDate(requestDto.getShippingDate());

        return mapToResponseDto(shipmentRepository.save(shipment));
    }

    @Transactional
    public ShipmentResponseDto updateStatus(Long id, StatusUpdateRequest request) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expédition non trouvée"));

        shipment.setCurrentStatus(request.getStatus());
        shipment.setCurrentLocation(request.getLocation());
        
        // Update enum status if valid
        try {
            Shipment.Status newStatus = Shipment.Status.valueOf(request.getStatus().toUpperCase().replace(" ", "_"));
            shipment.setStatus(newStatus);
        } catch (IllegalArgumentException e) {
            // Keep existing enum status if conversion fails
        }

        addStatusHistory(shipment, request.getStatus(), request.getLocation(), request.getDescription());
        
        return mapToResponseDto(shipmentRepository.save(shipment));
    }

    @Transactional
    public void deleteShipment(Long id) {
        shipmentRepository.deleteById(id);
    }

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

    private void addStatusHistory(Shipment shipment, String status, String location, String description) {
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
                .recipientFirstName(shipment.getRecipientFirstName())
                .recipientLastName(shipment.getRecipientLastName())
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
