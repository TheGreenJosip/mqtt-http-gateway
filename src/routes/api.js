const express = require('express');
const brokers = require('../config/brokers');
const { getClient } = require('../mqtt/mqttClientManager');

const router = express.Router();

// GET: Fetch last message for a topic
router.get('/events', (req, res) => {
  const { brokerKey, topic } = req.query;

  if (!brokerKey || !topic) {
    return res.status(400).json({ error: 'Invalid request. Provide brokerKey and topic.' });
  }

  const broker = brokers[brokerKey];
  if (!broker) {
    return res.status(404).json({ error: 'Broker not found.' });
  }

  const message = broker.lastMessage[topic];
  if (!message) {
    return res.status(404).json({ error: 'No message found for the topic.' });
  }

  res.json({ topic, message });
});

// POST: Publish a message to a topic
router.post('/publish', (req, res) => {
  const { brokerKey, topic, message } = req.body;

  if (!brokerKey || !topic || !message) {
    return res.status(400).json({ error: 'Invalid request. Provide brokerKey, topic, and message.' });
  }

  const mqttClient = getClient(brokerKey);
  if (!mqttClient) {
    return res.status(404).json({ error: 'Broker not found.' });
  }

  mqttClient.publish(topic, message, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to publish message.' });
    }
    res.json({ success: true, message: 'Message published successfully.' });
  });
});

module.exports = router;
