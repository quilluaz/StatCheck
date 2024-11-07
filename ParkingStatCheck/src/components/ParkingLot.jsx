import React, { useEffect, useState } from 'react';
import { fetchParkingLots, createParkingLot, updateParkingLot, deleteParkingLot } from '../api';

const ParkingLot = () => {
    const [parkingLots, setParkingLots] = useState([]);
    const [newLot, setNewLot] = useState({ lotNumber: '', totalSpaces: 1 });
    const [editingLot, setEditingLot] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadParkingLots = async () => {
            try {
                const response = await fetchParkingLots();
                setParkingLots(response.data);
            } catch (err) {
                setError('Failed to load parking lots.');
            }
        };
        loadParkingLots();
    }, []);

    const handleCreate = async () => {
        try {
            const response = await createParkingLot(newLot);
            setParkingLots([...parkingLots, response.data]);
            setNewLot({ lotNumber: '', totalSpaces: 0 });
            window.location.reload(); // Riprish
        } catch (err) {
            setError('Failed to create parking lot.');
        }
    };

    const handleEdit = async () => {
        if (editingLot) {
            try {
                const updatedLot = await updateParkingLot(editingLot.lotId, newLot);
                setParkingLots(parkingLots.map(lot => (lot.lotId === editingLot.lotId ? updatedLot.data : lot)));
                setEditingLot(null);
                setNewLot({ lotNumber: '', totalSpaces: 0 });
            } catch (err) {
                setError('Failed to update parking lot.');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteParkingLot(id);
            setParkingLots(parkingLots.filter(lot => lot.lotId !== id));
        } catch (err) {
            setError('Failed to delete parking lot.');
        }
    };

    const startEditing = (lot) => {
        setEditingLot(lot);
        setNewLot({ lotNumber: lot.lotNumber, totalSpaces: lot.totalSpaces });
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h1>Parking Lots</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Lot Number"
                value={newLot.lotNumber}
                onChange={(e) => setNewLot({ ...newLot, lotNumber: e.target.value })}
                style={{ margin: '5px' }}
            />
            <input
                type="number"
                placeholder="Total Spaces"
                value={newLot.totalSpaces}
                onChange={(e) => setNewLot({ ...newLot, totalSpaces: Number(e.target.value) })}
                style={{ margin: '5px' }}
            />
            {editingLot ? (
                <button onClick={handleEdit}>Update Parking Lot</button>
            ) : (
                <button onClick={handleCreate}>Create Parking Lot</button>
            )}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {parkingLots.map(lot => (
                    <li key={lot.lotId} style={{ margin: '10px 0' }}>
                        {lot.lotNumber} - {lot.totalSpaces} spaces
                        <button onClick={() => startEditing(lot)} style={{ marginLeft: '10px' }}>Edit</button>
                        <button onClick={() => handleDelete(lot.lotId)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingLot;
