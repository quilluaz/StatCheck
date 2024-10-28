package com.jizas.statcheck.service;

import com.jizas.statcheck.entity.RoomEntity;
import com.jizas.statcheck.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public List<RoomEntity> getAllRooms() {
        return roomRepository.findAll();
    }

    public RoomEntity getRoom(Long id) {
        return roomRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Room not found"));
    }

    public RoomEntity saveRoom(RoomEntity room) {
        return roomRepository.save(room);
    }

    public List<RoomEntity> getRoomsByBuilding(Long buildingId) {
        return roomRepository.findByBuilding_BldgID(buildingId);
    }
}