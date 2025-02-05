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

// Route to show the screens
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT screenid, screenname, area FROM public.screens');
        res.render('index', { screens: result.rows });
    } catch (err) {
        res.send('Error fetching screens: ' + err.message);
    }
});

// Route to handle the form submission
app.post('/update', async (req, res) => {
    const { screenid, area } = req.body;
    try {
        await pool.query('UPDATE public.screens SET area = $1 WHERE screenid = $2', [area, screenid]);
        res.redirect('/');
    } catch (err) {
        res.send('Error updating area: ' + err.message);
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
