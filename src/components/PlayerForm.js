import React, { useState } from 'react';
import axios from 'axios';

const PlayerForm = ({ onPlayerAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        goals: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user makes changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Validate form data
            if (!formData.name || !formData.country || !formData.goals) {
                setError('All fields are required');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/players', formData);
            onPlayerAdded(response.data);
            setFormData({ name: '', country: '', goals: '' });
            alert('Player added successfully!');
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setError(
                error.response?.data?.message || 
                error.response?.data?.error || 
                error.message || 
                'Error adding player'
            );
        }
    };

    return (
        <div className="player-form">
            <h2>Add New Player</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Goals:</label>
                    <input
                        type="number"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default PlayerForm; 