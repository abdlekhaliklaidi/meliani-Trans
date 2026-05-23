package com.melianitrans.repository;

import com.melianitrans.entity.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {
    
    List<ContactRequest> findByStatusOrderByCreatedAtDesc(ContactRequest.ContactStatus status);
    
    List<ContactRequest> findAllByOrderByCreatedAtDesc();
    
    long countByStatus(ContactRequest.ContactStatus status);
}
