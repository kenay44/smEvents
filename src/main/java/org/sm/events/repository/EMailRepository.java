package org.sm.events.repository;

import org.sm.events.domain.EMail;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EMail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EMailRepository extends JpaRepository<EMail, Long> {

}
