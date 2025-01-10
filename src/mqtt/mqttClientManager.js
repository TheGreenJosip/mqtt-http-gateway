const mqtt = require('mqtt');
const brokers = require('../config/brokers');
const logger = require('../utils/logger');

const mqttClients = {};

const connectToBrokers = () => {
  Object.keys(brokers).forEach((key) => {
    const broker = brokers[key];
    logger.info(`Connecting to broker: ${key} (${broker.url})`);

    const mqttClient = mqtt.connect(broker.url, broker.options);

    mqttClient.on('connect', () => {
      logger.info(`Connected to broker: ${key}`);
      mqttClient.subscribe('#', (err) => {
        if (err) {
          logger.error(`Subscription error for ${key}: ${err.message}`);
        } else {
          logger.info(`Subscribed to all topics on broker: ${key}`);
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      const msg = message.toString();
      logger.info(`[${key}] Received message on topic: ${topic}`);
      broker.lastMessage[topic] = msg;
    });

    mqttClient.on('error', (err) => {
      logger.error(`Error with broker ${key}: ${err.message}`);
    });

    mqttClients[key] = mqttClient;
  });
};

const getClient = (brokerKey) => mqttClients[brokerKey];

module.exports = { connectToBrokers, getClient };
