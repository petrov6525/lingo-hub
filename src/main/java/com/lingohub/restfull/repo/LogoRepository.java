package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.Logo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogoRepository extends JpaRepository<Logo, Long> {

    Optional<Logo> findByName(String name);
}
