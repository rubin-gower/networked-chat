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
    ws.on('message', (message) => {
        
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
       // ws.send("hi");
        

        //log the received message and send it back to the client
       
        const secretRegex = /^secret\:/;
        const broadcastRegex = /^broad\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            
            wss.clients
                .forEach(client => {
                   
                    if (client != ws) {
                        client.send(`b: ${message} `);
                    }    
                });
            
        } 
        else if(secretRegex.test(message)) {
            message = message.replace(broadcastRegex, '');
            ws.send(`the secret is pie`)
        }
        else {
            ws.send(`sent -> ${message}`);
        }
    });


    //send immediatly a feedback to the incoming connection    
    ws.send('connected to WebSocket server');
});

//start our server
// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });

module.exports = server
