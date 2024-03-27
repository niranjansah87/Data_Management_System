const express = require('express');
const router = express.Router();
// const dbConfig = require('../config/db.config'); 
const dataModel = require('../models/dataModel'); // Require data model (if applicable)

// Route 1: Insert data
router.post("/insert", async (req, res) => {
  const { date, words } = req.body;

  try {
    const userId = await dataModel.createUser(date, words);
    res.status(201).send(`User added with ID: ${userId}`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send(error.message); // Provide user-friendly error message (optional)
  }
});

// Route 2: Get data by date and words
router.get("/search", async (req, res) => {
  const { date, words } = req.query; // Assuming date and words are sent as query parameters

  try {
    const results = await dataModel.getDataByDateWords(date, words);
    if (results.length === 0) {
      res.status(200).send('No data found for the provided search criteria.');
    } else {
      res.status(200).send(results); // Send the retrieved data
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal server error'); // Generic error message for now
  }
});

