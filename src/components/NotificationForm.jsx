import React, { useEffect, useState } from 'react';
import { fetchNotifications, createNotification, updateNotification, deleteNotification } from '../api'; // Ensure the API methods are defined

const NotificationForm = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [analyticsId, setAnalyticsId] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentNotificationId, setCurrentNotificationId] = useState(null);

    const handleSendNotification = async (e) => {
        e.preventDefault();
        try {
            const notificationData = {
                userId: userId ? parseInt(userId) : null,
                message,
                analytics: analyticsId ? { analyticsId: parseInt(analyticsId) } : null,
            };

            if (editMode) {
                // Update existing notification
                await updateNotification(currentNotificationId, notificationData);
                alert('Notification updated successfully!');
            } else {
                // Create new notification
                await createNotification(notificationData);
                alert('Notification sent successfully!');
            }

            // Refresh the notification list
            await loadNotifications();
            clearForm();
        } catch (error) {
            console.error('Error sending notification:', error);
            if (error.response && error.response.data) {
                alert('Failed to send notification: ' + JSON.stringify(error.response.data));
            } else {
                alert('Failed to send notification: ' + error.message);
            }
        }
    };

    const loadNotifications = async () => {
        try {
            const response = await fetchNotifications();
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleEdit = (notification) => {
        setUserId(notification.userId);
        setMessage(notification.message);
        setAnalyticsId(notification.analytics?.analyticsId || '');
        setCurrentNotificationId(notification.notificationId);
        setEditMode(true);
    };

    const handleDelete = async (notificationId) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                await deleteNotification(notificationId);
                alert('Notification deleted successfully!');
                await loadNotifications(); // Refresh the notification list
            } catch (error) {
                console.error('Error deleting notification:', error);
                alert('Failed to delete notification: ' + (error.response?.data || error.message));
            }
        }
    };

    const clearForm = () => {
        setUserId('');
        setMessage('');
        setAnalyticsId('');
        setCurrentNotificationId(null);
        setEditMode(false);
    };

    useEffect(() => {
        loadNotifications(); // Load notifications when the component mounts
    }, []);

    return (
        <div>
            <h2>{editMode ? 'Edit Notification' : 'Create Notification'}</h2>
            <form onSubmit={handleSendNotification}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{ width: '160px'}}
                    />
                </div>
                <div>
                    <label>Analytics ID:</label>
                    <input
                        type="number"
                        value={analyticsId}
                        onChange={(e) => setAnalyticsId(e.target.value)}
                        style={{ width: '140px', marginBottom: '10px'}}
                    />
                </div>
                <button type="submit">{editMode ? 'Update Notification' : 'Send Notification'}</button>
                {editMode && <button type="button" onClick={clearForm}>Cancel Edit</button>}
            </form>

            <h2>Notifications Records</h2>
                    <ul className="notification-list">
                        {notifications.map((notification) => (
                            <li key={notification.notificationId}>
                                <p><strong>ID:</strong> {notification.notificationId}</p>
                                <p><strong>User ID:</strong> {notification.userId}</p>
                                <p><strong>Message:</strong> {notification.message}</p>
                                <p><strong>Date Sent:</strong> {new Date(notification.dateSent).toLocaleString()}</p>
                                <p><strong>Status:</strong> {notification.status === 0 ? 'Unread' : 'Read'}</p>
                                <button onClick={() => handleEdit(notification)}>Edit</button>
                                <button onClick={() => handleDelete(notification.notificationId)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                <hr style={{ borderColor: 'white', margin: '10px 0' }} /> {/* Single divider after the list */}
        </div>
    );
};

export default NotificationForm;
