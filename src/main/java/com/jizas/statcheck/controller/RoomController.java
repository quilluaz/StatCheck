package com.jizas.statcheck.controller;

import com.jizas.statcheck.entity.RoomEntity;
import com.jizas.statcheck.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<RoomEntity> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public RoomEntity getRoom(@PathVariable Long id) {
        return roomService.getRoom(id);
    }

    @GetMapping("/building/{buildingId}")
    public List<RoomEntity> getRoomsByBuilding(@PathVariable Long buildingId) {
        return roomService.getRoomsByBuilding(buildingId);
    }

    @PostMapping
    public RoomEntity createRoom(@RequestBody RoomEntity room) {
        return roomService.saveRoom(room);
    }
}