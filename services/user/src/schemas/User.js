const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	name: { type: String },
	phone: { type: Number, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	authKey: { type: String, required: true },
	role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

userSchema.index({ '$**': 'text' });

module.exports = model('User', userSchema);
