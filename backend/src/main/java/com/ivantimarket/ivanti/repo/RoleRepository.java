package com.ivantimarket.ivanti.repo;

import com.ivantimarket.ivanti.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role,String> {
    Role findByName(String name);
}
