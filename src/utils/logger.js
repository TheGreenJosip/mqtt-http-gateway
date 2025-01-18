/**
 * @file logger.js
 * @description A simple logger utility for logging informational and error messages to the console.
 * Provides a lightweight abstraction for logging, which can be extended to integrate with more advanced logging libraries or services.
 */

/**
 * Logs an informational message to the console.
 * 
 * @function
 * @param {string} message - The message to log.
 * @example
 * logger.info('Application started successfully.');
 */
const info = (message) => {
  console.log(`[INFO]: ${message}`);
};

/**
 * Logs an error message to the console.
 * 
 * @function
 * @param {string} message - The error message to log.
 * @example
 * logger.error('Failed to connect to the database.');
 */
const error = (message) => {
  console.error(`[ERROR]: ${message}`);
};

/**
 * @type {Object}
 * @property {function(string): void} info - Logs informational messages.
 * @property {function(string): void} error - Logs error messages.
 * @description A simple logger object with methods for logging informational and error messages.
 */
const logger = {
  info,
  error,
};

module.exports = logger;
