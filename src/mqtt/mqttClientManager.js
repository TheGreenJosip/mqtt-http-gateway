const mqtt = require('mqtt');
const brokers = require('../config/brokers');
const logger = require('../utils/logger');

/**
 * @file mqttClientManager.js
 * @description Manages MQTT client connections for all configured brokers. Handles connection, subscription, message processing, and error handling.
 */

/**
 * @typedef {import('../config/brokers').BrokerConfig} BrokerConfig
 * @typedef {import('mqtt').MqttClient} MqttClient
 */

/**
 * @type {Object<string, MqttClient>}
 * @description A mapping of broker keys to their respective MQTT client instances.
 */
const mqttClients = {};

/**
 * Establishes connections to all configured MQTT brokers.
 * - Iterates through the `brokers` configuration and connects to each broker.
 * - Subscribes to all topics (`#`) on each broker.
 * - Handles incoming messages and stores the last received message for each topic.
 */
const connectToBrokers = () => {
  Object.keys(brokers).forEach((key) => {
    const broker = brokers[key];
    logger.info(`Connecting to broker: ${key} (${broker.url})`);

    // Create an MQTT client instance for the broker
    const mqttClient = mqtt.connect(broker.url, broker.options);

    // Event: Successfully connected to the broker
    mqttClient.on('connect', () => {
      logger.info(`Connected to broker: ${key}`);

      // Subscribe to all topics on the broker
      mqttClient.subscribe('#', (err) => {
        if (err) {
          logger.error(`Subscription error for ${key}: ${err.message}`);
        } else {
          logger.info(`Subscribed to all topics on broker: ${key}`);
        }
      });
    });

    // Event: Message received on a subscribed topic
    mqttClient.on('message', (topic, message) => {
      const msg = message.toString(); // Convert the message buffer to a string
      logger.info(`[${key}] Received message on topic: ${topic}`);
      broker.lastMessage[topic] = msg; // Store the last received message for the topic
    });

    // Event: Error encountered with the MQTT client
    mqttClient.on('error', (err) => {
      logger.error(`Error with broker ${key}: ${err.message}`);
    });

    // Store the MQTT client instance in the `mqttClients` map
    mqttClients[key] = mqttClient;
  });
};

/**
 * Retrieves the MQTT client instance for a specific broker.
 * 
 * @param {string} brokerKey - The key identifying the broker (e.g., "remoteOpener").
 * @returns {MqttClient | undefined} The MQTT client instance for the specified broker, or `undefined` if not found.
 */
const getClient = (brokerKey) => mqttClients[brokerKey];

module.exports = { connectToBrokers, getClient };
