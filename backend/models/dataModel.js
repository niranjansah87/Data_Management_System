
const mysql2 = require('mysql2/promise');
const dbConfig = require('../config/db.config'); 
const pool = mysql2.createPool(dbConfig); 

const createUser = async (date, words) => {
  const query = `INSERT INTO data (date, words) VALUES (?, ?)`;

  try {
    const [results] = await pool.execute(query, [date, words]);
    return results.insertId; 
  } catch (error) {
    throw error; 
  }
};


const getDataByDateWords = async (query, params) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    throw error; 
  }
};
module.exports = { createUser, getDataByDateWords };
