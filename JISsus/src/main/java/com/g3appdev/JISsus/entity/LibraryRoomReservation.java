package com.g3appdev.JISsus.entity;

import jakarta.persistence.*;

@Entity
public class LibraryRoomReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryReservationID;

    @ManyToOne
    @JoinColumn(name = "libraryRoomID", nullable = false)
    private LibraryRoom libraryRoom;

    @ManyToOne
    @JoinColumn(name = "UserID", nullable = false)
    private User user;

    private String startTime;
    private String endTime;
    private String reservationStatus;


    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public Long getLibraryReservationID() {
        return libraryReservationID;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public User getUser() {
        return user;
    }

    public LibraryRoom getLibraryRoom() {
        return libraryRoom;
    }

}



