const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./models/User');
require('./services/passport');

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV == 'production'){
    // Express will serve up production assets. Ex) main js file
    app.use(exprss.static('client/build'))

    // Express will serve up the index.html if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Mongoose connection
mongoose.connect(keys.dbHost,{useMongoClient: true});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});