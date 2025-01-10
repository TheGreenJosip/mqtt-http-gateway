# MQTT-to-HTTP Gateway

## Overview

The **MQTT-to-HTTP Gateway** is a robust, scalable, and modular middleware application designed to bridge MQTT brokers with HTTP-based clients. This application enables seamless communication between MQTT and HTTP protocols, providing a secure, efficient, and centralized solution for message processing and routing.

By acting as a gateway, this application abstracts the complexities of MQTT communication from HTTP clients, ensuring security, flexibility, and maintainability. It is particularly suited for IoT ecosystems, real-time data streaming, and scenarios where MQTT brokers need to interface with RESTful APIs.

---

## Key Features

- **Protocol Bridging**: Converts MQTT messages into HTTP responses and vice versa.
- **Secure Communication**: Supports basic authentication for MQTT brokers and ensures sensitive credentials are not exposed to HTTP clients.
- **Modular Design**: Built with a clean, extensible architecture for easy customization and scalability.
- **Multi-Broker Support**: Handles multiple MQTT brokers with independent configurations.
- **Wildcard Subscriptions**: Subscribes to all topics (`#`) by default, enabling broad message coverage.
- **RESTful API**: Provides intuitive HTTP endpoints for publishing and retrieving MQTT messages.
- **Environment-Driven Configuration**: Uses `.env` for managing sensitive credentials and runtime configurations.
- **Lightweight and Efficient**: Built with Node.js and optimized for high performance.

---

## Architecture

The application is structured to follow modern software engineering practices, ensuring maintainability and scalability. Below is the high-level architecture:

1. **MQTT Client Manager**: Manages connections to MQTT brokers and handles message subscriptions and publishing.
2. **HTTP API Layer**: Exposes RESTful endpoints for HTTP clients to interact with the MQTT brokers.
3. **Configuration Layer**: Centralized configuration for managing multiple brokers and their respective options.
4. **Utility Layer**: Provides reusable utilities such as logging for consistent and structured output.

---

## Use Cases

- **IoT Gateways**: Centralize communication between IoT devices using MQTT and HTTP-based control systems.
- **Real-Time Data Streaming**: Stream MQTT messages to HTTP clients for real-time dashboards or analytics.
- **Protocol Abstraction**: Simplify client-side development by abstracting MQTT complexities behind an HTTP interface.
- **Secure Broker Access**: Protect MQTT broker credentials by exposing only the HTTP API to clients.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js (v16 or higher) installed.
- **pnpm**: Install `pnpm` for package management.
- **MQTT Broker**: A public or private MQTT broker (e.g., `remote-opener.westeurope.cloudapp.azure.com`).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mqtt-http-gateway.git
   cd mqtt-http-gateway
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MQTT broker details:
   ```env
   PORT=3000
   MQTT_BROKER_URL=https://remote-opener.westeurope.cloudapp.azure.com
   MQTT_USERNAME=your-username
   MQTT_PASSWORD=your-password
   ```

---

### Running the Application

Start the application in development mode:
```bash
pnpm nodemon src/server.js
```

The server will start on `http://localhost:3000`.

---

## API Documentation

### 1. **GET `/api/events`**

Retrieve the last message for a specific topic from the MQTT broker.

#### Request:
```bash
curl -X GET "http://localhost:3000/api/events?brokerKey=remoteOpener&topic=my/topic"
```

#### Query Parameters:
- `brokerKey` (string): The key identifying the MQTT broker (e.g., `remoteOpener`).
- `topic` (string): The MQTT topic to retrieve the last message for.

#### Response:
```json
{
  "topic": "my/topic",
  "message": "Hello, MQTT!"
}
```

---

### 2. **POST `/api/publish`**

Publish a message to a specific topic on the MQTT broker.

#### Request:
```bash
curl -X POST "http://localhost:3000/api/publish" \
-H "Content-Type: application/json" \
-d '{
  "brokerKey": "remoteOpener",
  "topic": "my/topic",
  "message": "Hello, MQTT!"
}'
```

#### Request Body:
- `brokerKey` (string): The key identifying the MQTT broker (e.g., `remoteOpener`).
- `topic` (string): The MQTT topic to publish the message to.
- `message` (string): The message to publish.

#### Response:
```json
{
  "success": true,
  "message": "Message published successfully."
}
```

---

## Configuration

The application uses environment variables for configuration. Below are the available options:

| Variable           | Description                                      | Default Value |
|--------------------|--------------------------------------------------|---------------|
| `PORT`             | The port on which the HTTP server will run.      | `3000`        |
| `MQTT_BROKER_URL`  | The URL of the MQTT broker.                      | -             |
| `MQTT_USERNAME`    | The username for MQTT broker authentication.     | -             |
| `MQTT_PASSWORD`    | The password for MQTT broker authentication.     | -             |

---

## Project Structure

```
mqtt-http-gateway/
├── src/
│   ├── config/
│   │   └── brokers.js        # MQTT broker configurations
│   ├── mqtt/
│   │   ├── mqttClientManager.js # Manages MQTT connections
│   │   └── mqttHandler.js       # (Optional) Custom MQTT logic
│   ├── routes/
│   │   └── api.js            # HTTP API routes
│   ├── server.js             # Server initialization
│   └── utils/
│       └── logger.js         # Logging utility
├── .env.sample               # Environment variable sample
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration (optional)
└── README.md                 # Project documentation
```

---

## Extensibility

This application is designed with extensibility in mind. Below are some ways to extend its functionality:

1. **Custom Message Processing**: Add custom logic in the `mqttHandler.js` file to process incoming MQTT messages.
2. **Authentication**: Implement API key-based authentication for HTTP endpoints.
3. **Persistent Storage**: Store MQTT messages in a database for historical analysis.
4. **Advanced Routing**: Add support for dynamic topic routing based on HTTP requests.

---

## Contributing

We welcome contributions to improve this project! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
