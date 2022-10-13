const WebSocket = require('ws')

const wss = new WebSocket.Server({port: 443}, () => {
    console.log('server started');
})

wss.on('connection', function connection(ws) {
    
    ws.send('WebSocket connected');
    
    wss.broadcast = function(data, sender) {
        wss.clients.forEach(function(client) {
            if (client !== sender) {
                client.send(data.toString())
            } 
        })
    }
    ws.on('message', (data) => {
        console.log('data received: ', data.toString());
        wss.broadcast(data, ws);
    });
    ws.on('error', error => {
        console.log('exception: ', error.toString());
        // TODO
    });
    ws.on('close', ws =>  {
        console.log('close connection');
        // TODO
    });
})

wss.on('listening', () => {
    console.log('listening on 8080');
})