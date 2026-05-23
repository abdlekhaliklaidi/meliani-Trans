package com.melianitrans.controller;

import com.melianitrans.dto.TrackingResponse;
import com.melianitrans.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracking")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TrackingController {

    @Autowired
    private ShipmentService shipmentService;

    @GetMapping("/{trackingNumber}")
    public ResponseEntity<TrackingResponse> trackShipment(@PathVariable String trackingNumber) {
        TrackingResponse response = shipmentService.trackShipment(trackingNumber);
        return ResponseEntity.ok(response);
    }
}
