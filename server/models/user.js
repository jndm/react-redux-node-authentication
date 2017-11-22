const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const _ = require('lodash');

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
		minlength: 1
	},
	password: {
		type: String,
		required: true,
		minlength: 1
	}
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.pre('save', function (next) {
	const user = this;
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) { return next(err); }

			user.password = hash;
			next();
		});
	})
});

const User = mongoose.model('user', UserSchema);

module.exports = User;