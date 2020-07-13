const path = require('path')
const express = require('express')


const http = require('http');
const WebSocket = require('ws');



const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))


//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (messagea) => {

        //log the received message and send it back to the client
        console.log('received: %s', messagea);
        ws.send(`Hello, you sent -> ${messagea}`);
       // ws.send("hi");
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('connected to WebSocket server');
});

//start our server
// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });

module.exports = server
