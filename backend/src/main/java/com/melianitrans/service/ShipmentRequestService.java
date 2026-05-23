package com.melianitrans.service;

import com.melianitrans.dto.ShipmentClientRequestDto;
import com.melianitrans.entity.ShipmentRequest;
import com.melianitrans.repository.ShipmentRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShipmentRequestService {

    @Autowired
    private ShipmentRequestRepository shipmentRequestRepository;

    @Transactional
    public ShipmentRequest createRequest(ShipmentClientRequestDto dto) {
        ShipmentRequest request = new ShipmentRequest();
        request.setFirstName(dto.getFirstName());
        request.setLastName(dto.getLastName());
        request.setShippingCity(dto.getShippingCity());
        request.setDeliveryCity(dto.getDeliveryCity());
        request.setCountry(dto.getCountry());
        request.setShippingDate(dto.getShippingDate());
        request.setPhone(dto.getPhone());
        request.setEmail(dto.getEmail());
        request.setAdditionalInfo(dto.getAdditionalInfo());
        request.setRequestStatus(ShipmentRequest.RequestStatus.EN_ATTENTE);
        return shipmentRequestRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<ShipmentRequest> getAllRequests() {
        return shipmentRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<ShipmentRequest> getPendingRequests() {
        return shipmentRequestRepository.findByRequestStatusOrderByCreatedAtDesc(ShipmentRequest.RequestStatus.EN_ATTENTE);
    }

    @Transactional(readOnly = true)
    public ShipmentRequest getRequestById(Long id) {
        return shipmentRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
    }

    @Transactional
    public ShipmentRequest updateRequestStatus(Long id, ShipmentRequest.RequestStatus status) {
        ShipmentRequest request = getRequestById(id);
        request.setRequestStatus(status);
        return shipmentRequestRepository.save(request);
    }

    @Transactional
    public void deleteRequest(Long id) {
        shipmentRequestRepository.deleteById(id);
    }
}
