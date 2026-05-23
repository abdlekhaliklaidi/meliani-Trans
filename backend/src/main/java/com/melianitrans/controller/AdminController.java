package com.melianitrans.controller;

import com.melianitrans.entity.ContactRequest;
import com.melianitrans.entity.ShipmentRequest;
import com.melianitrans.service.ContactRequestService;
import com.melianitrans.service.ShipmentRequestService;
import com.melianitrans.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    @Autowired
    private ShipmentService shipmentService;

    @Autowired
    private ShipmentRequestService shipmentRequestService;

    @Autowired
    private ContactRequestService contactRequestService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalShipments", shipmentService.countAllShipments());
        stats.put("deliveredShipments", shipmentService.countDeliveredShipments());
        stats.put("inTransitShipments", shipmentService.countInTransitShipments());
        stats.put("newContactRequests", contactRequestService.countNewRequests());
        stats.put("pendingShipmentRequests", shipmentRequestService.getPendingRequests().size());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/shipment-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ShipmentRequest>> getAllShipmentRequests() {
        return ResponseEntity.ok(shipmentRequestService.getAllRequests());
    }

    @GetMapping("/contact-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactRequest>> getAllContactRequests() {
        return ResponseEntity.ok(contactRequestService.getAllContactRequests());
    }
}
