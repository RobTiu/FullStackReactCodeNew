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
            proxy: true // trust the proxy to redirect the proper http protocol
        },
        (accessToken, refreshToken, profile, done) => {
            // check to see if the user exists in the user table. if it exists, then just return the user, otherwise create a new one
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                    // we already have a record with the given profile ID
                }
                else {
                    // we don't have a user record wiht this ID, make a new record
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));

                }
            });

        }
    )
);