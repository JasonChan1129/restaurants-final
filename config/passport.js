const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = app => {
	app.use(passport.initialize());
	app.use(passport.session());

	// verification
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
			},
			(email, password, done) => {
				User.findOne({ email })
					.then(user => {
						if (!user) {
							return done(null, false);
						}
						return bcrypt
							.compare(password, user.password)
							.then(isMatch => {
								if (!isMatch) {
									return done(null, false);
								}
								return done(null, user);
							})
							.catch(err => done(err, false));
					})
					.catch(err => done(err, false));
			}
		)
	);

	// in order to have session works properly
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then(user => done(null, user))
			.catch(err => done(err, null));
	});
};