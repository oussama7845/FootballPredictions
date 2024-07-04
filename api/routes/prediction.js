const express = require('express');
const router = express.Router();
const { Prediction, User } = require('../models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
require('dotenv').config();

// Get all predictions
router.get('/predictions', async (req, res) => {
  try {
    const predictions = await Prediction.findAll();
    return res.status(200).json(predictions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while fetching predictions.' });
  }
});

// Get a single prediction by ID
router.get('/predictions/:id', async (req, res) => {
  try {
    const prediction = await Prediction.findByPk(req.params.id);
    if (prediction) {
      return res.status(200).json(prediction);
    } else {
      return res.status(404).json({ error: 'Prediction not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while fetching the prediction.' });
  }
});

// Create a new prediction
router.post('/createPredictions', async (req, res) => {
  const { idGame, idUser, prediction } = req.body;

  try {
    const newPrediction = await Prediction.create({
      idGame: idGame,
      UserId: idUser,
      prediction: prediction,
    });

    return res.status(200).json(newPrediction);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while creating the prediction.' });
  }
});

// Update a prediction
router.put('/predictions/:id', async (req, res) => {
  const { idGame, idUser, prediction } = req.body;

  try {
    const existingPrediction = await Prediction.findByPk(req.params.id);
    if (existingPrediction) {
      existingPrediction.idGame = idGame;
      existingPrediction.UserId = idUser;
      existingPrediction.prediction = prediction;

      await existingPrediction.save();
      return res.status(200).json(existingPrediction);
    } else {
      return res.status(404).json({ error: 'Prediction not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while updating the prediction.' });
  }
});

// Delete a prediction
router.delete('/predictions/:id', async (req, res) => {
  try {
    const existingPrediction = await Prediction.findByPk(req.params.id);
    if (existingPrediction) {
      await existingPrediction.destroy();
      return res.status(200).json({ message: 'Prediction deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Prediction not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while deleting the prediction.' });
  }
});

module.exports = router;
