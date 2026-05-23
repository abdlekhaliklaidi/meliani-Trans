package com.melianitrans.controller;

import com.melianitrans.dto.MessageResponse;
import com.melianitrans.dto.ShipmentClientRequestDto;
import com.melianitrans.entity.ShipmentRequest;
import com.melianitrans.service.ShipmentRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ShipmentRequestController {

    @Autowired
    private ShipmentRequestService shipmentRequestService;

    @PostMapping("/request")
    public ResponseEntity<?> createShipmentRequest(@Valid @RequestBody ShipmentClientRequestDto dto) {
        ShipmentRequest request = shipmentRequestService.createRequest(dto);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Votre demande d'envoi a été soumise avec succès. Notre équipe vous contactera bientôt.")
                .success(true)
                .build());
    }

    @GetMapping("/requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ShipmentRequest>> getAllRequests() {
        return ResponseEntity.ok(shipmentRequestService.getAllRequests());
    }

    @GetMapping("/requests/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ShipmentRequest>> getPendingRequests() {
        return ResponseEntity.ok(shipmentRequestService.getPendingRequests());
    }

    @GetMapping("/requests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(shipmentRequestService.getRequestById(id));
    }

    @PatchMapping("/requests/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentRequest> updateRequestStatus(@PathVariable Long id, 
                                                                @RequestParam ShipmentRequest.RequestStatus status) {
        return ResponseEntity.ok(shipmentRequestService.updateRequestStatus(id, status));
    }

    @DeleteMapping("/requests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id) {
        shipmentRequestService.deleteRequest(id);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Demande supprimée avec succès")
                .success(true)
                .build());
    }
}
