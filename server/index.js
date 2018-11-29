const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./model/User');
require('./services/passport');
const keys = require('./config/keys');


const app = express();
app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

mongoose.connect(keys.mongoUri);
const PORT = process.env.PORT || 5000;
app.listen(PORT);