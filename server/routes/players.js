const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find().sort({ createdAt: -1 });
        res.json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: error.message });
    }
});

// Add a new player
router.post('/', async (req, res) => {
    try {
        console.log('Received player data:', req.body);
        
        // Validate required fields
        if (!req.body.name || !req.body.country || req.body.goals === undefined) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: req.body
            });
        }

        const player = new Player({
            name: req.body.name,
            country: req.body.country,
            goals: parseInt(req.body.goals)
        });

        console.log('Creating player:', player);
        const newPlayer = await player.save();
        console.log('Player saved successfully:', newPlayer);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({ 
            message: 'Error creating player',
            error: error.message,
            received: req.body
        });
    }
});

module.exports = router; 