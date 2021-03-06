const express = require('express');

const routes = require('./routes');

require('./db');

const app = express();

// app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
