package com.ivantimarket.ivanti.service;

import com.ivantimarket.ivanti.dto._mapper.PackageMapper;
//import com.ivantimarket.ivanti.dto._mapper.UserMapper;
import com.ivantimarket.ivanti.dto._mapper.UserMapper;
import com.ivantimarket.ivanti.dto.packages.NewPackageDTO;
import com.ivantimarket.ivanti.dto.packages.PackageOverviewDTO;
import com.ivantimarket.ivanti.model.Package;
import com.ivantimarket.ivanti.model.SystemRequirements;
import com.ivantimarket.ivanti.model.User;
import com.ivantimarket.ivanti.model.Version;
import com.ivantimarket.ivanti.repo.PackageRepository;
import com.ivantimarket.ivanti.repo.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PackageService {
    private final PackageRepository packageRepository;
    private final PackageMapper packageMapper;
    private final UserRepository userService;
    private final UserMapper userMapper;
    public List<PackageOverviewDTO> getAllPackages() {

        List<Package> packages = packageRepository.findAll();
        List<PackageOverviewDTO> dtos = new ArrayList<>();
        for(Package p : packages){
            PackageOverviewDTO dto = packageMapper.toPackageOverviewDTO(p);
            List<Version> versions = p.getVersions();
            Version latestVersion = versions.get(versions.size() - 1);
            dto.setLatestVersion(latestVersion);
            dtos.add(dto);
        }
        return dtos;
    }

    public Package getPackage(long packageId) {
        return packageRepository.findById(packageId);
    }


    public Package addNewPackage(NewPackageDTO newPackageDTO, Version version, SystemRequirements requirements) {

        log.info(newPackageDTO.toString());
        User user = userService.findById(newPackageDTO.getCreatorId());
        user.getDownloaded_packages_id().add(newPackageDTO.getId());
        userService.save(user);
        Package newPackage = packageMapper.toPackage(newPackageDTO);
        newPackage.setCreator(userMapper.toUserDto(user));
        newPackage.getVersions().add(version);
        newPackage.setSystemRequirements(requirements);
        log.info("Id: {}, Title: {}, Creator: {}",String.valueOf(newPackage.getId()), newPackage.getTitle(), newPackage.getCreator());
       return packageRepository.save(newPackage);
    }


    public Package addVersion(long packageId, Version version){
        Package pckg = packageRepository.findById(packageId);
        pckg.getVersions().add(version);
        return packageRepository.save(pckg);
    }

    public void deletePackage(int id) {
        packageRepository.deleteById(id);
    }
}
