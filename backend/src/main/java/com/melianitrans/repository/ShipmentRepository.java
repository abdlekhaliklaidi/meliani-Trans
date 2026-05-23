package com.melianitrans.repository;

import com.melianitrans.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    
    Optional<Shipment> findByTrackingNumber(String trackingNumber);
    
    List<Shipment> findByStatusOrderByCreatedAtDesc(Shipment.Status status);
    
    @Query("SELECT s FROM Shipment s ORDER BY s.createdAt DESC")
    List<Shipment> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(s) FROM Shipment s")
    long countAllShipments();
    
    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'LIVRE'")
    long countDeliveredShipments();
    
    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'EN_TRANSIT'")
    long countInTransitShipments();
}
