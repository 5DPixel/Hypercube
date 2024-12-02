const { randomUUID } = require("crypto");
const WebSocket = require("ws");

const PORT = 8080
const wss = new WebSocket.Server({ port: PORT });

const clients = new Map();

wss.on('connection', (ws) => {
    const id = randomUUID();
    const clientMetadata = { id };

    clients.set(ws, clientMetadata);

    ws.on('message', (messageString) => {
        const message = JSON.parse(messageString);
        const messageMetadata = clients.get(ws);
        
        message.sender = messageMetadata.id;

        const outbound = JSON.stringify(message);

        [...clients.keys()].forEach((client) => {
            client.send(outbound);
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

console.log(`WebSocket running on port ${PORT}`);