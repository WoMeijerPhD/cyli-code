const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

// Broadcast coordinates to all connected clients
function broadcastCoordinates(coordinates) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(coordinates));
        }
    });
}

// Handle new WebSocket connections
wss.on('connection', ws => {
    // Add client to the set of connected clients
    clients.add(ws);

    // Handle incoming messages from the client
    ws.on('message', message => {
        // Parse the message as JSON
        const coordinates = JSON.parse(message);

        // Broadcast the coordinates to all connected clients
        broadcastCoordinates(coordinates);
    });

    // Handle WebSocket connection close
    ws.on('close', () => {
        // Remove client from the set of connected clients
        clients.delete(ws);
    });
});