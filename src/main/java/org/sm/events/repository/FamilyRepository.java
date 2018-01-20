package org.sm.events.repository;

import org.sm.events.domain.Family;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Family entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {

}
