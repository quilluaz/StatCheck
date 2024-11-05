package com.g3appdev.JISsus.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "libraryRoomID")
public class LibraryRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int libraryRoomID;

    private String roomName;
    @ElementCollection
    private List<String> availableTimeSlots;
    private String bookingStatus;
    @OneToMany(mappedBy = "libraryRoom", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
    private List<LibraryRoomReservation> reservations;


    public int getLibraryRoomID() {
        return libraryRoomID;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public List<String>  getAvailableTimeSlots() {
        return availableTimeSlots;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public void setAvailableTimeSlots(List<String> availableTimeSlots) {
        this.availableTimeSlots = availableTimeSlots;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
