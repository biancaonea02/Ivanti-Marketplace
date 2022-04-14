package com.ivantimarket.ivanti.repo;

import com.ivantimarket.ivanti.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, Integer> {
    User findById(long id);

    User findByUsername(String username);

    User findByEmail(String email);
}
