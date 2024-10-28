package com.jizas.statcheck.service;

import com.jizas.statcheck.entity.BuildingEntity;
import com.jizas.statcheck.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BuildingService {
    @Autowired
    private BuildingRepository buildingRepository;

    public List<BuildingEntity> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public BuildingEntity getBuilding(Long id) {
        return buildingRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Building not found"));
    }

    public BuildingEntity saveBuilding(BuildingEntity building) {
        return buildingRepository.save(building);
    }
}