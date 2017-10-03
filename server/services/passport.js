const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

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
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
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