import axios from 'axios';

const API_URL = '/api/notifications'; // Base URL for notifications API
const ANALYTICS_API_URL = '/api/analytics'; // Base URL for analytics API

export const fetchNotifications = async () => {
    return await axios.get(`${API_URL}/getAll`); // Fetch all notifications
};

export const createNotification = async (notification) => {
    return await axios.post(`${API_URL}/sendNotification`, notification); // Create a new notification
};

export const getNotificationsByUser = async (userId) => {
    return await axios.get(`${API_URL}/getNotificationsByUser/${userId}`); // Fetch notifications for a specific user
};

export const markNotificationAsRead = async (id) => {
    return await axios.put(`${API_URL}/markAsRead/${id}`); // Mark a notification as read
};

// Update notification function in your API file
export const updateNotification = async (id, notification) => {
    return await axios.put(`${API_URL}/update/${id}`, notification);
};

export const deleteNotification = async (id) => {
    return await axios.delete(`${API_URL}/delete/${id}`);
};

// Add any other necessary API calls here
export const fetchAnalytics = async () => {
    return await axios.get(`${ANALYTICS_API_URL}/getAll`);
};

export const createAnalytics = async (analytics) => {
    return await axios.post(`${ANALYTICS_API_URL}/create`, analytics);
};

export const updateAnalytics = async (id, analyticsData) => {
    return await axios.put(`/api/analytics/update/${id}`, analyticsData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteAnalytics = async (id) => {
    return await axios.delete(`${ANALYTICS_API_URL}/delete/${id}`);
};