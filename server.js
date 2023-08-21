const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4444;
const routes = require('./routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});