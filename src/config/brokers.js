const fs = require('fs');
const path = require('path');

/**
 * @file brokers.js
 * @description This module defines the configuration for MQTT brokers used in the application.
 * It includes connection details, authentication options, and placeholders for storing the last received message.
 */

/**
 * @typedef {Object} BrokerOptions
 * @property {string} clientId - A unique client identifier for the MQTT connection.
 * @property {boolean} clean - Whether the session should start clean (no persistent session).
 * @property {string} [username] - The username for MQTT broker authentication.
 * @property {string} [password] - The password for MQTT broker authentication.
 */

/**
 * @typedef {Object} BrokerConfig
 * @property {string} url - The URL of the MQTT broker.
 * @property {BrokerOptions} options - Connection options for the MQTT broker.
 * @property {Object} lastMessage - A placeholder for storing the last received message for each topic.
 */

/**
 * @type {Object<string, BrokerConfig>}
 * @description An object containing configurations for all MQTT brokers used in the application.
 * Each key represents a unique broker identifier, and the value contains its configuration.
 */
const brokers = {
  /**
   * Configuration for the "remoteOpener" MQTT broker.
   * The broker URL and authentication details are loaded from environment variables.
   */
  remoteOpener: {
    url: process.env.MQTT_BROKER_URL, // The URL of the MQTT broker (e.g., mqtt://broker.example.com).
    options: {
      clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`, // Generate a unique client ID for the connection.
      clean: true, // Start with a clean session (no persistent session state).
      username: process.env.MQTT_USERNAME, // Username for broker authentication (from environment variables).
      password: process.env.MQTT_PASSWORD, // Password for broker authentication (from environment variables).
    },
    lastMessage: {}, // Object to store the last received message for each topic.
  },
};

module.exports = brokers;
