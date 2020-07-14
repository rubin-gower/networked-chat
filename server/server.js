const path = require('path')
const express = require('express')


const http = require('http');
const WebSocket = require('ws');
const { WSAEWOULDBLOCK } = require('constants');



const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))

 
const secretRegex = /^secret\:/;
const broadcastRegex = /^broad\:/;
const pmRegex = /^private\:/;

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
var id = 0;
var lookup = {};
wss.on('connection', (ws) => {
    
console.log(wss.clients.size)
ws.id = id++;
lookup[ws.id] = ws;

console.log(id)
console.log(lookup)

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        
        //log the received message and send it back to the client
        console.log('received: %s', message);
        let msg = message.replace(broadcastRegex, '')
        msg = msg.replace(pmRegex, '')
        
        ws.send(`you: ${msg}`);
       // ws.send("hi");
        

        //log the received message and send it back to the client
      
        
        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            
            wss.clients
                .forEach(client => {
                   
                    if (client != ws) {
                        client.send(`user: ${message} `);
                    }    
                })  
        } 
        else if(secretRegex.test(message)) {
            message = message.replace(broadcastRegex, '');
            ws.send(`the secret is pie`)
        }
        else if(pmRegex.test(message)) {
            console.log(message)
        }
        else {
          
            ws.send(`you: ${message}`);
        }
    });


    //send immediatly a feedback to the incoming connection    
    ws.send(`Your connected!\n other users: ${(wss.clients.size - 1).toString()}`);
});

//start our server
// server.listen(process.env.PORT || 8999, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });

module.exports = server
