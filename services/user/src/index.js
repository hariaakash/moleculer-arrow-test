const os = require('os');
const { ServiceBroker } = require('moleculer');

const mongoConnect = require('./helpers/mongodb');

const list = require('./controllers/list');

const uri = process.env.RABBITMQ_URI ? process.env.RABBITMQ_URI : 'rabbitmq:5672';
const user = process.env.RABBITMQ_USER ? process.env.RABBITMQ_USER : 'arrowadmin';
const pass = process.env.RABBITMQ_PASS ? process.env.RABBITMQ_PASS : 'adminpassword';
const virtHost = process.env.RABBITMQ_VIRT_HOST ? process.env.RABBITMQ_VIRT_HOST : 'arrow_server';

const broker = new ServiceBroker({
	namespace: 'dev',
	nodeID: (process.env.NODEID ? `${process.env.NODEID}-` : '') + os.hostname().toLowerCase(),
	transporter: `amqp://${user}:${pass}@${uri}/${virtHost}`,
});

broker.createService({
	name: 'user',
	actions: { list },
	created() {
		mongoConnect();
	},
	events: {
		listed(ctx) {
			console.log('event');
		},
	},
});

const start = async () => {
	try {
		await broker.start();
	} catch (err) {
		console.log('err');
	}
};
start();
