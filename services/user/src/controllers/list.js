const User = require('../schemas/User');

module.exports = async (ctx) => {
	// const data = await User.find({}).select('-password');
	const data = [{ name: 'hari' }];
	ctx.emit('listed', data);
	return data;
};
