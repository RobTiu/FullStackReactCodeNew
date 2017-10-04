const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// initialize the user schema so we can start manipulating the database
const User = mongoose.model('users');

// generate the identifying piece of info and set it into the
passport.serializeUser((user, done) => {
    done(null, user.id);

});

// deserialize the id passed from the cookie to turn it into a user
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true 
             /*
             trust the proxy to redirect the proper http protocol cuz heroku is using a load balancer to determine the proxy
             by default google strategy does not trust proxy but in heroku, the proxy is in the heroku server itself so we are fine 
             with setting it to true
             */
        },        
        async (accessToken, refreshToken, profile, done) => {
            // check to see if the user exists in the user table. if it exists, then just return the user, otherwise create a new one
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);               
            }
            
            // we don't have a user record wiht this ID, make a new record
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);            
        }
    )
);