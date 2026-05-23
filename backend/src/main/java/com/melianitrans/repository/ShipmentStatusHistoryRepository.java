package com.melianitrans.repository;

import com.melianitrans.entity.ShipmentStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipmentStatusHistoryRepository extends JpaRepository<ShipmentStatusHistory, Long> {
    
    List<ShipmentStatusHistory> findByShipmentIdOrderByTimestampDesc(Long shipmentId);
}
