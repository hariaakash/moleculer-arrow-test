const User = require('../schemas/User');

module.exports = async (ctx) => {
	const data = await User.find({}).select('-password');
	console.log('qq');
	ctx.emit('listed', data);
	return data;
};
