const os = require('os');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ServiceBroker } = require('moleculer');

const uri = process.env.RABBITMQ_URI ? process.env.RABBITMQ_URI : 'rabbitmq:5672';
const user = process.env.RABBITMQ_USER ? process.env.RABBITMQ_USER : 'arrowadmin';
const pass = process.env.RABBITMQ_PASS ? process.env.RABBITMQ_PASS : 'adminpassword';
const virtHost = process.env.RABBITMQ_VIRT_HOST ? process.env.RABBITMQ_VIRT_HOST : 'arrow_server';

const broker = new ServiceBroker({
	namespace: 'dev',
	nodeID: (process.env.NODEID ? `${process.env.NODEID}-` : '') + os.hostname().toLowerCase(),
	transporter: `amqp://${user}:${pass}@${uri}/${virtHost}`,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

broker.start();

app.get('/user/list', async (req, res) => {
	const data = await broker.call('user.list', { msg: 'qq', hi: 'jaja' });
	res.json(data);
});

app.listen(process.env.API_PORT);
console.log(`Server running on port: ${process.env.API_PORT}`);
