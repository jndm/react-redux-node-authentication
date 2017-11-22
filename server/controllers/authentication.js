const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		res.status(422).send({ error: 'You must provide email and password' });
	}

	try {
		var existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(422).send({ error: 'Email is in use' });
		}

		let user = await new User({ email, password }).save();
		var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		res.header('x-auth', token).status(201).send(user);

	} catch (err) {
		res.status(400).send({ error: 'Failed to create user' });
	}
}

module.exports.signin = (req, res) => {
	const user = req.user;	// Passport sends this after it's done with validating password
	var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
	res.header('x-auth', token).send();
}