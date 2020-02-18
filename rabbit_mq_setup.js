require('dotenv').config();

const amqp = require('amqplib');

// RabbitMQ connection string
const messageQueueConnectionString = process.env.CLOUDAMQP_URL;

async function setup() {
  console.log("Setting up RabbitMQ Exchanges/Queues");
  // connect to RabbitMQ Instance
  let connection = await amqp.connect(messageQueueConnectionString);

  // create a channel
  let channel = await connection.createChannel();

  // create exchange
  await channel.assertExchange("processing", "direct", { durable: true });

  // create queues
  await channel.assertQueue("processing.offerRequests", { durable: true });
  await channel.assertQueue("processing.userRequests", { durable: true });

  // bind queues
  await channel.bindQueue("processing.offerRequests","processing", "offerRequest");
  await channel.bindQueue("processing.userRequests","processing", "userRequest");

  console.log("Setup DONE");
  process.exit();
}

setup();
