const express = require('express');
//const path = require('path');

//const dist = path.join(__dirname, 'dist');

const PORT = 8080;
const HOST = '127.0.0.1';

const app = express();

app.use('/person', express.static('dist'));

app.get('/is_alive', (req, res) => {
    res.sendStatus(200);
});

app.get('/is_ready', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, HOST);
console.log(`Running server on port ${PORT}`);
