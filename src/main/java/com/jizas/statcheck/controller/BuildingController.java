package com.jizas.statcheck.controller;

import com.jizas.statcheck.entity.BuildingEntity;
import com.jizas.statcheck.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    @Autowired
    private BuildingService buildingService;

    @GetMapping
    public List<BuildingEntity> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @GetMapping("/{id}")
    public BuildingEntity getBuilding(@PathVariable Long id) {
        return buildingService.getBuilding(id);
    }

    @PostMapping
    public BuildingEntity createBuilding(@RequestBody BuildingEntity building) {
        return buildingService.saveBuilding(building);
    }
}