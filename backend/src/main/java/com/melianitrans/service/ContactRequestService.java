package com.melianitrans.service;

import com.melianitrans.dto.ContactRequestDto;
import com.melianitrans.entity.ContactRequest;
import com.melianitrans.repository.ContactRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactRequestService {

    @Autowired
    private ContactRequestRepository contactRequestRepository;

    @Transactional
    public ContactRequest createContactRequest(ContactRequestDto dto) {
        ContactRequest request = new ContactRequest();
        request.setFullName(dto.getFullName());
        request.setEmail(dto.getEmail());
        request.setPhone(dto.getPhone());
        request.setSubject(dto.getSubject());
        request.setMessage(dto.getMessage());
        request.setStatus(ContactRequest.ContactStatus.NOUVEAU);
        return contactRequestRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<ContactRequest> getAllContactRequests() {
        return contactRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<ContactRequest> getNewContactRequests() {
        return contactRequestRepository.findByStatusOrderByCreatedAtDesc(ContactRequest.ContactStatus.NOUVEAU);
    }

    @Transactional(readOnly = true)
    public ContactRequest getContactRequestById(Long id) {
        return contactRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demande de contact non trouvée"));
    }

    @Transactional
    public ContactRequest updateStatus(Long id, ContactRequest.ContactStatus status) {
        ContactRequest request = getContactRequestById(id);
        request.setStatus(status);
        return contactRequestRepository.save(request);
    }

    @Transactional
    public void deleteContactRequest(Long id) {
        contactRequestRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long countNewRequests() {
        return contactRequestRepository.countByStatus(ContactRequest.ContactStatus.NOUVEAU);
    }
}
