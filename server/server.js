const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('dist'));

app.get('/is_alive', (req, res) => {
    res.sendStatus(200);
});

app.get('/is_ready', (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, HOST);
console.log(`Running server on port ${PORT}`);
//testcomment
