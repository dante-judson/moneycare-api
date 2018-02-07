const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect(keys.mongoUrl);
require('./models/userModel');
require('./models/entryModel');

require('./routes/userRoutes')(app);
require('./routes/entryRoutes')(app);

const port = process.env.PORT || 3000;

app.listen(port);