package com.jizas.statcheck.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class BuildingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bldgID;

    private String bldgName;

    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<RoomEntity> roomEntities;

    public BuildingEntity() {
    }

    // Getters and Setters
    public Long getBldgID() {
        return bldgID;
    }

    public void setBldgID(Long bldgID) {
        this.bldgID = bldgID;
    }

    public String getBldgName() {
        return bldgName;
    }

    public void setBldgName(String bldgName) {
        this.bldgName = bldgName;
    }

    public List<RoomEntity> getRooms() {
        return roomEntities;
    }

    public void setRooms(List<RoomEntity> roomEntities) {
        this.roomEntities = roomEntities;
    }
}
