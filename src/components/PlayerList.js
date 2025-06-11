import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/players');
            setPlayers(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching players:', error);
            setError('Error loading players. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className="player-list">
            <div className="player-list-header">
                <h2>Football Players</h2>
                <button onClick={fetchPlayers} className="refresh-button">
                    Refresh List
                </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loading">Loading players...</div>
            ) : players.length === 0 ? (
                <div className="no-players">No players found. Add some players using the form above!</div>
            ) : (
                <div className="players-grid">
                    {players.map((player) => (
                        <div key={player._id} className="player-card">
                            <h3>{player.name}</h3>
                            <p>Country: {player.country}</p>
                            <p>Goals: {player.goals}</p>
                            <p className="date">Added: {new Date(player.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlayerList; 