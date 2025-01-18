/**
 * @file server.js
 * @description Entry point for the application. Sets up the Express server, initializes middleware, routes, and MQTT broker connections.
 */

require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { connectToBrokers } = require('./mqtt/mqttClientManager');
const logger = require('./utils/logger');

const app = express();

/**
 * The port on which the server will run.
 * Defaults to 3000 if not specified in the environment variables.
 * @constant {number}
 */
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ origin: '*' })); // Enable Cross-Origin Resource Sharing (CORS) for all origins

// API Routes
app.use('/api', apiRoutes); // Mount API routes under the `/api` path

// Initialize MQTT broker connections
connectToBrokers();

/**
 * Starts the Express server and listens for incoming requests.
 * Logs a message indicating that the server is running.
 */
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
