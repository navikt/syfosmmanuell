const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

app.get('/is_alive', (req, res) => res.sendStatus(200));
app.get('/is_ready', (req, res) => res.sendStatus(200));

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(port, () => console.log(`App listening on port ${port}!`));
