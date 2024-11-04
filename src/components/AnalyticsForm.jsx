// AnalyticsForm.jsx
import React, { useEffect, useState } from 'react';
import { fetchAnalytics, createAnalytics, updateAnalytics, deleteAnalytics } from '../api'; // Ensure the API methods for analytics are defined

const AnalyticsForm = () => {
    const [roomId, setRoomId] = useState('');
    const [usageRate, setUsageRate] = useState('');
    const [peakHours, setPeakHours] = useState('');
    const [analyticsRecords, setAnalyticsRecords] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentAnalyticsId, setCurrentAnalyticsId] = useState(null);

    const handleSaveAnalytics = async (e) => {
        e.preventDefault();
        try {
            const analyticsData = {
                roomId: roomId ? parseInt(roomId) : null,
                usageRate: parseFloat(usageRate),
                peakHours,
            };

            if (editMode) {
                // Update existing analytics record
                await updateAnalytics(currentAnalyticsId, analyticsData);
                alert('Analytics record updated successfully!');
            } else {
                // Create new analytics record
                await createAnalytics(analyticsData);
                alert('Analytics record created successfully!');
            }

            // Refresh the analytics list
            await loadAnalyticsRecords();
            clearForm();
        } catch (error) {
            console.error('Error saving analytics record:', error);
            alert('Failed to save analytics record: ' + error.message);
        }
    };

    const loadAnalyticsRecords = async () => {
        try {
            const response = await fetchAnalytics();
            setAnalyticsRecords(response.data);
        } catch (error) {
            console.error('Error fetching analytics records:', error);
        }
    };

    const handleEdit = (analytics) => {
        setRoomId(analytics.roomId);
        setUsageRate(analytics.usageRate);
        setPeakHours(analytics.peakHours);
        setCurrentAnalyticsId(analytics.analyticsId);
        setEditMode(true);
    };

    const handleDelete = async (analyticsId) => {
        if (window.confirm('Are you sure you want to delete this analytics record?')) {
            try {
                await deleteAnalytics(analyticsId);
                alert('Analytics record deleted successfully!');
                await loadAnalyticsRecords();
            } catch (error) {
                console.error('Error deleting analytics record:', error);
                alert('Failed to delete analytics record: ' + error.message);
            }
        }
    };

    const clearForm = () => {
        setRoomId('');
        setUsageRate('');
        setPeakHours('');
        setCurrentAnalyticsId(null);
        setEditMode(false);
    };

    useEffect(() => {
        loadAnalyticsRecords(); // Load analytics records on mount
    }, []);

    return (
        <div>
            <h2>{editMode ? 'Edit Analytics Record' : 'Create Analytics Record'}</h2>
            <form onSubmit={handleSaveAnalytics}>
                <div>
                    <label>Room ID:</label>
                    <input
                        type="number"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                        style={{ marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Usage Rate (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={usageRate}
                        onChange={(e) => setUsageRate(e.target.value)}
                        required
                        style={{ width: '115px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Peak Hours:</label>
                    <input
                        type="text"
                        value={peakHours}
                        onChange={(e) => setPeakHours(e.target.value)}
                        required
                        style={{ width: '150px', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit">{editMode ? 'Update Analytics' : 'Save Analytics'}</button>
                {editMode && <button type="button" onClick={clearForm}>Cancel Edit</button>}
            </form>

            <h2 className="analytics-heading">Analytics Records</h2>
              <ul className="analytics-list">
                {analyticsRecords.map((analytics) => (
                  <li key={analytics.analyticsId}>
                    <p><strong>ID:</strong> {analytics.analyticsId}</p>
                    <p><strong>Room ID:</strong> {analytics.roomId}</p>
                    <p><strong>Usage Rate:</strong> {analytics.usageRate}%</p>
                    <p><strong>Peak Hours:</strong> {analytics.peakHours}</p>
                    <p><strong>Date Generated:</strong> {new Date(analytics.dateGenerated).toLocaleString()}</p>
                    <button onClick={() => handleEdit(analytics)}>Edit</button>
                    <button onClick={() => handleDelete(analytics.analyticsId)}>Delete</button>
                  </li>
                ))}
              </ul>
              <hr style={{ borderColor: 'white', margin: '10px 0' }} /> {/* Single divider after the list */}
        </div>
    );
};

export default AnalyticsForm;
