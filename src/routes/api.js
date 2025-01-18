const express = require('express');
const brokers = require('../config/brokers');
const { getClient } = require('../mqtt/mqttClientManager');

const router = express.Router();

/**
 * @file api.js
 * @description Defines the HTTP API routes for interacting with MQTT brokers. 
 * Provides endpoints to fetch the last message for a topic and to publish messages to a topic.
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - A description of the error that occurred.
 */

/**
 * @typedef {Object} SuccessResponse
 * @property {boolean} success - Indicates whether the operation was successful.
 * @property {string} message - A success message.
 */

/**
 * @typedef {Object} EventResponse
 * @property {string} topic - The MQTT topic.
 * @property {string} message - The last received message for the topic.
 */

/**
 * GET `/events`
 * Fetches the last message received for a specific topic from the specified broker.
 * 
 * @name GET /events
 * @function
 * @param {string} req.query.brokerKey - The key identifying the broker (e.g., "remoteOpener").
 * @param {string} req.query.topic - The MQTT topic to fetch the last message for.
 * @returns {EventResponse|ErrorResponse} The last message for the topic or an error response.
 */
router.get('/events', (req, res) => {
  const { brokerKey, topic } = req.query;

  // Validate query parameters
  if (!brokerKey || !topic) {
    return res.status(400).json({ error: 'Invalid request. Provide brokerKey and topic.' });
  }

  // Retrieve the broker configuration
  const broker = brokers[brokerKey];
  if (!broker) {
    return res.status(404).json({ error: 'Broker not found.' });
  }

  // Retrieve the last message for the specified topic
  const message = broker.lastMessage[topic];
  if (!message) {
    return res.status(404).json({ error: 'No message found for the topic.' });
  }

  // Return the last message
  res.json({ topic, message });
});

/**
 * POST `/publish`
 * Publishes a message to a specific topic on the specified broker.
 * 
 * @name POST /publish
 * @function
 * @param {string} req.body.brokerKey - The key identifying the broker (e.g., "remoteOpener").
 * @param {string} req.body.topic - The MQTT topic to publish the message to.
 * @param {string} req.body.message - The message to publish.
 * @returns {SuccessResponse|ErrorResponse} A success response or an error response.
 */
router.post('/publish', (req, res) => {
  const { brokerKey, topic, message } = req.body;

  // Validate request body parameters
  if (!brokerKey || !topic || !message) {
    return res.status(400).json({ error: 'Invalid request. Provide brokerKey, topic, and message.' });
  }

  // Retrieve the MQTT client for the specified broker
  const mqttClient = getClient(brokerKey);
  if (!mqttClient) {
    return res.status(404).json({ error: 'Broker not found.' });
  }

  // Publish the message to the specified topic
  mqttClient.publish(topic, message, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to publish message.' });
    }
    res.json({ success: true, message: 'Message published successfully.' });
  });
});

module.exports = router;
