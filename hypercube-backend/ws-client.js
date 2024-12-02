const WebSocket = require('ws');

const url = 'ws://localhost:8080';
const ws = new WebSocket.WebSocket(url);

ws.on('open', () => {
    console.log('Connected to WebSocket server');
    const testMessage = {
        type: 'chat',
        content: 'First message'
    };
    ws.send(JSON.stringify(testMessage));
});

ws.on('message', (data) => {
    const receivedMessage = JSON.parse(data);
    console.log('Received message from server:', receivedMessage);
});

ws.on('close', () => {
    console.log('Disconnected from WebSocket server');
});

ws.on('error', (err) => {
    console.error('WebSocket error:', err);
});
