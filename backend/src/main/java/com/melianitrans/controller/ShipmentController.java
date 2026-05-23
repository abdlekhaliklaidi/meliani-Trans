package com.melianitrans.controller;

import com.melianitrans.dto.*;
import com.melianitrans.service.ShipmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ShipmentController {

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ShipmentResponseDto>> getAllShipments() {
        return ResponseEntity.ok(shipmentService.getAllShipments());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponseDto> getShipmentById(@PathVariable Long id) {
        return ResponseEntity.ok(shipmentService.getShipmentById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponseDto> createShipment(@Valid @RequestBody ShipmentRequestDto requestDto) {
        return ResponseEntity.ok(shipmentService.createShipment(requestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponseDto> updateShipment(@PathVariable Long id, 
                                                               @Valid @RequestBody ShipmentRequestDto requestDto) {
        return ResponseEntity.ok(shipmentService.updateShipment(id, requestDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteShipment(@PathVariable Long id) {
        shipmentService.deleteShipment(id);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Expédition supprimée avec succès")
                .success(true)
                .build());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponseDto> updateStatus(@PathVariable Long id, 
                                                             @Valid @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(shipmentService.updateStatus(id, request));
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getShipmentStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", shipmentService.countAllShipments());
        stats.put("delivered", shipmentService.countDeliveredShipments());
        stats.put("inTransit", shipmentService.countInTransitShipments());
        return ResponseEntity.ok(stats);
    }
}
