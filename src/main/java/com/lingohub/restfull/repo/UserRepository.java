package com.lingohub.restfull.repo;

import com.lingohub.restfull.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Integer> {

    User findUserByEmail(String email);

}
