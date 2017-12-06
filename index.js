const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

require('dotenv').config();
require('./models/User');
require('./services/passport');

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// Mongoose connection
mongoose.connect(keys.dbHost,{useMongoClient: true});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});