const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const localOptions = { usernameField: 'email', passwordField: 'password' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
	try {
		var user = await User.findOne({email});
		if(!user) {
			return done(null, false);
		}

		const correctPassword = await bcrypt.compare(password, user.password);
		if(correctPassword) {
			done(null, user);
		} else {
			done(null, false);
		}

	} catch (error) {
			return done(error);
	}
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
	secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		var user = await User.findById(payload.id);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		fone(error);
	}
});

passport.use(jwtLogin);
passport.use(localLogin);