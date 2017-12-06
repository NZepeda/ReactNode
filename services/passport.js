const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('Users'); 

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log("Deserializing: ", user);
        done(null, user);
    })
}); 

// Configure passport 
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((existingUser) => {
        if(existingUser){
            // User already exists
            done(null, existingUser);
        }
        else{

            // Create the user 
            new User({clientId: profile.id}).save().then((user)  => {
                done(null, user);
            });
        }
    })
}));