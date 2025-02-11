const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const pool = new Pool({
    user: 'u3m7grklvtlo6',
    host: '35.209.89.182',
    database: 'dbzvtfeophlfnr',
    password: 'AekAds@24',
    port: 5432, // Default PostgreSQL port
});

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch and display table data
app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM public.auth';
    const result = await pool.query(query);
    res.render('editData', { authData: result.rows });
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// Update record
app.post('/update/:userid', async (req, res) => {
  const userid = req.params.userid;
  const {
    username, password, screenids, token, email, status, role, device_token,
    slot9_url, slot10_url, slot9_status, slot10_status, per_screen_rent,
    total_rent, chairman_name, chairman_number, secretary_name, secretary_number, household
  } = req.body;

  try {
    const updateQuery = `
      UPDATE public.auth 
      SET username = $1, password = $2, screenids = $3, token = $4, email = $5,
          status = $6, role = $7, device_token = $8, slot9_url = $9, slot10_url = $10,
          slot9_status = $11, slot10_status = $12, per_screen_rent = $13, total_rent = $14,
          chairman_name = $15, chairman_number = $16, secretary_name = $17,
          secretary_number = $18, household = $19
      WHERE userid = $20
    `;
    await pool.query(updateQuery, [
      username, password, screenids, token, email, status, role, device_token,
      slot9_url, slot10_url, slot9_status, slot10_status, per_screen_rent,
      total_rent, chairman_name, chairman_number, secretary_name, secretary_number,
      household, userid
    ]);

    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error updating data');
  }
});
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
