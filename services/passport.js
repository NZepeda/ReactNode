const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');


// Mongo Model
const User = mongoose.model('Users'); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
}); 

// Configure passport 
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, 
async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
   
    if(existingUser){
        // User already exists
        return done(null, existingUser);
    }
    
    // Create the user 
    const user = await new User({clientId: profile.id}).save();
    done(null, user);
}));