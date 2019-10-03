const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('dist'));

app.get('/test-seb', (req, res) => {
    res.send('Hello world');
});

app.get('/is_alive', (req, res) => {
    res.sendStatus(200);
});

app.get('/is_ready', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, HOST);
console.log(`Running server on port ${PORT}`);
//testcomment
