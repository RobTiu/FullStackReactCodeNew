const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

/* 
	app use calls are use to wire up middlewares (i.e. app.use).  
	used to modify incoming requests from our app before they're sent off to ROUTE HANDLERS
*/

/* 
	initialize cookies
	cookiesession is just for processing incoming request and populating the req.session properties
	There's also another cookie session called express-session and we're not using it because we don't 
	have 14kb worth of data that we need to store in mongodb.  cookieSession will store all data in the cookie
	while expressSession will store it in the database and we're given a reference to that record
*/
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
		keys: [keys.cookieKey]
	})
);

// tell passport to use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// process.env is an environment variable set up by heroku or whatever hosting site we decide to use
const PORT = process.env.PORT || 5000;

app.listen(PORT);