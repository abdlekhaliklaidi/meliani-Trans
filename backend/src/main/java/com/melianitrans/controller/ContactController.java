package com.melianitrans.controller;

import com.melianitrans.dto.ContactRequestDto;
import com.melianitrans.dto.MessageResponse;
import com.melianitrans.entity.ContactRequest;
import com.melianitrans.service.ContactRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ContactController {

    @Autowired
    private ContactRequestService contactRequestService;

    @PostMapping("/request")
    public ResponseEntity<?> createContactRequest(@Valid @RequestBody ContactRequestDto dto) {
        contactRequestService.createContactRequest(dto);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Votre message a été envoyé avec succès. Notre équipe vous répondra dans les plus brefs délais.")
                .success(true)
                .build());
    }

    @GetMapping("/requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactRequest>> getAllContactRequests() {
        return ResponseEntity.ok(contactRequestService.getAllContactRequests());
    }

    @GetMapping("/requests/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactRequest>> getNewContactRequests() {
        return ResponseEntity.ok(contactRequestService.getNewContactRequests());
    }

    @GetMapping("/requests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactRequest> getContactRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(contactRequestService.getContactRequestById(id));
    }

    @PatchMapping("/requests/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactRequest> updateContactStatus(@PathVariable Long id,
                                                               @RequestParam ContactRequest.ContactStatus status) {
        return ResponseEntity.ok(contactRequestService.updateStatus(id, status));
    }

    @DeleteMapping("/requests/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteContactRequest(@PathVariable Long id) {
        contactRequestService.deleteContactRequest(id);
        return ResponseEntity.ok(MessageResponse.builder()
                .message("Demande de contact supprimée avec succès")
                .success(true)
                .build());
    }

    @GetMapping("/requests/count/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> countNewRequests() {
        return ResponseEntity.ok(contactRequestService.countNewRequests());
    }
}
