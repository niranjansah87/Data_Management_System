//Server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using mysql2/promise for improved error handling

const dbConfig = require('./config/db.config'); // Configuration for database connection

const app = express();
const port = 3001;

// Create a connection pool for efficient database interactions
const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    // Attempt to connect to the database
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Release the connection back to the pool after successful execution
    connection.release();

    // Define routes here (assuming they're in a separate file, e.g., routes/data.js)
    app.use('/api', require('./routes/data'));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process on failure
  }
})(); // Immediately-Invoked Function Expression (IIFE) for cleaner code
