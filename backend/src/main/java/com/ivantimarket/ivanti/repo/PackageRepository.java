package com.ivantimarket.ivanti.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.ivantimarket.ivanti.model.Package;

import java.util.Optional;

@Repository
public interface PackageRepository extends MongoRepository<Package,Integer> {

    Package findById(long id);
    Optional<Package> findByTitle(String title);

    Boolean existsByTitle(String title);
}
