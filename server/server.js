const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static('dist'));

app.get('/test-seb', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT, HOST);
console.log(`Running server on port ${PORT}`);
//testcomment
