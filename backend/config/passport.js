const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder_id',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_secret',
                callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                    const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

                    if (!email) {
                        return done(new Error('No email found in Google profile'), null);
                    }

                    const newUser = {
                        googleId: profile.id,
                        username: (profile.displayName || 'user').replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
                        email: email,
                        avatar: avatar,
                    };

                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        return done(null, user);
                    } else {
                        // Check if user with same email exists
                        user = await User.findOne({ email: email });
                        if (user) {
                            user.googleId = profile.id;
                            if (avatar) user.avatar = avatar;
                            await user.save();
                            return done(null, user);
                        } else {
                            user = await User.create(newUser);
                            return done(null, user);
                        }
                    }
                } catch (err) {
                    console.error('Google Auth Strategy Error:', err);
                    return done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
