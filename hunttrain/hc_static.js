const express = require('express');
const path = require('path');

const app = express();

const port = 3030;

app.use(express.static('static'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.listen(port, () => `App is currently running on port ${port}`);