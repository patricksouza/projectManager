const express = require('express');
const cors = require('cors');

const PORT = 3333;
const HOST = '127.0.0.1';

const app = express();


app.use(cors());

app.use(express.json());

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
