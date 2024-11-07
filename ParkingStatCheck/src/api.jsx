import axios from 'axios';

const API_URL = '/api';

export const fetchParkingLots = async () => {
    return await axios.get(`${API_URL}/parking-lots`);
};

export const createParkingLot = async (parkingLot) => {
    return await axios.post(`${API_URL}/parking-lots`, parkingLot);
};

export const updateParkingLot = async (id, parkingLot) => {
    return await axios.put(`${API_URL}/parking-lots/${id}`, parkingLot);
};

export const deleteParkingLot = async (id) => {
    return await axios.delete(`${API_URL}/parking-lots/${id}`);
};

export const fetchReservations = async () => {
    return await axios.get(`${API_URL}/reservations`);
};

export const createReservation = async (reservation) => {
    return await axios.post(`${API_URL}/reservations`, reservation);
};

// Define and export the updateReservation function
export const updateReservation = async (id, reservation) => {
    return await axios.put(`${API_URL}/reservations/${id}`, reservation);
};

// Define and export the deleteReservation function
export const deleteReservation = async (id) => {
    return await axios.delete(`${API_URL}/reservations/${id}`);
};

// Add any other necessary API calls here
