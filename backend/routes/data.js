const express = require('express');
const router = express.Router();
const dataModel = require('../models/dataModel'); 

// Route 1: Insert data
router.post("/insert", async (req, res) => {
  const { date, words } = req.body;

  try {
    const userId = await dataModel.createUser(date, words);
    res.status(201).send(`User added with ID: ${userId}`);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send(error.message); 
  }
});


// Route 2: Search data by word
router.get("/searchByWord", async (req, res) => {
  let { words } = req.query;

  try {
    let query;
    let params;

    if (!words) {
      throw new Error('Words must be provided for search.');
    }

    // Convert search query to lowercase
    words = words.toLowerCase();

    // Use wildcard pattern to match all words containing the provided letters
    query = 'SELECT * FROM data WHERE LOWER(words) LIKE ?';
    params = ['%' + words + '%']; // Wildcard pattern to match all words containing the provided letters

    const results = await dataModel.getDataByDateWords(query, params);
    if (results.length === 0) {
      res.status(200).send('No data found for the provided word.');
    } else {
      res.status(200).send(results);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal server error');
  }
});

// Route 3: Search data by date
router.get("/searchByDate", async (req, res) => {
  const { date } = req.query;

  try {
    if (!date) {
      throw new Error('Date must be provided for search.');
    }

    const results = await dataModel.getDataByDateWords('SELECT * FROM data WHERE date = ?', [date]);
    if (results.length === 0) {
      res.status(200).send('No data found for the provided date.');
    } else {
      res.status(200).send(results);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
