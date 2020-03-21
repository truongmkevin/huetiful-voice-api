const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	User.findOne(
		{ _id: id },
		'username',
		(err, user) => {
			console.log('*** Deserialize user, user:')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})


passport.use(new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(email, password, done) {
        console.log(email, password)
		User.findOne({ email: email }, (err, user) => {
            console.log(err, user)
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
))

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'secret',
};

passport.use(
    'jwt',
    new JWTstrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.find({email: jwt_payload.email})
            if (user) {
                console.log('user found in db in passport');
                // note the return removed with passport JWT - add this return for passport local
                done(null, user);
            } else {
                console.log('user not found in db');
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    }),
);

module.exports = passport