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
    console.error('Error fetching data:', err);
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
      SET username = COALESCE($1, username),
          password = COALESCE($2, password),
          screenids = COALESCE($3, screenids),
          token = COALESCE($4, token),
          email = COALESCE($5, email),
          status = COALESCE($6, status),
          role = COALESCE($7, role),
          device_token = COALESCE($8, device_token),
          slot9_url = COALESCE($9, slot9_url),
          slot10_url = COALESCE($10, slot10_url),
          slot9_status = COALESCE($11, slot9_status),
          slot10_status = COALESCE($12, slot10_status),
          per_screen_rent = COALESCE($13, per_screen_rent),
          total_rent = COALESCE($14, total_rent),
          chairman_name = COALESCE($15, chairman_name),
          chairman_number = COALESCE($16, chairman_number),
          secretary_name = COALESCE($17, secretary_name),
          secretary_number = COALESCE($18, secretary_number),
          household = COALESCE($19, household)
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
    console.error('Error updating data:', err);
    res.status(500).send('Error updating data');
  }
});
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
