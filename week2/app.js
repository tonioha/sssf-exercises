'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cats = require('./routes/catRouter');
const users = require('./routes/userRouter');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRouter');

app.use(express.static('week2_public_html'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.use('/cat', passport.authenticate('jwt', {session: false}), cats);
app.use('/user', passport.authenticate('jwt', {session: false}), users);
app.use('/cat', cats);
app.use('/user', users);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
