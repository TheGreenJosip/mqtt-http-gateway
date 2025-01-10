const fs = require('fs');
const path = require('path');

const brokers = {
    remoteOpener: {
      url: process.env.MQTT_BROKER_URL,
      options: {
        clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      },
      lastMessage: {},
    },
  };
  
module.exports = brokers;
