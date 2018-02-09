const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('./middlewares/corsMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(cors);

mongoose.connect(keys.mongoUrl);
require('./models/userModel');
require('./models/entryModel');

require('./routes/userRoutes')(app);
require('./routes/entryRoutes')(app);
require('./routes/reportRoutes')(app);

const port = process.env.PORT || 3000;

app.listen(port);