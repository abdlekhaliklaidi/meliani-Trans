package com.melianitrans.repository;

import com.melianitrans.entity.ShipmentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentRequestRepository extends JpaRepository<ShipmentRequest, Long> {
    
    List<ShipmentRequest> findByRequestStatusOrderByCreatedAtDesc(ShipmentRequest.RequestStatus status);
    
    List<ShipmentRequest> findAllByOrderByCreatedAtDesc();
}
