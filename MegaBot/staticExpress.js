/* packages we need */

var bot = require('./bot.js')
var express = require('express')

var app = express()

/* Use a static web page
  */
app.use(express.static('public'))

// We use some static resources
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/images', express.static(__dirname + '/public/images'))

// We start the Express server
var server = app.listen(8080, function() {
    console.log('Server started at http://localhost:8080')
})

// This is what we need for our websockets
var WSS = require('websocket').server,
    http = require('http')

var server = http.createServer()
server.listen(8181)

/* We're creating a bot, but it can't communicate with us yet
*/
var myBot = new bot()

// Here we create the server
var wss = new WSS({
    httpServer: server,
    autoAcceptConnections: false
})

var connections = {}

// When a client socket wants to connect to the server, it goes here
wss.on('request', function(request) {
    var connection = request.accept('chat', request.origin)

    connection.on('message', function(message) {
        var name = ''

        for (var key in connections) {
            if (connection === connections[key]) {
                name = key
            }
        }

        var data = JSON.parse(message.utf8Data)
        var msg = 'leer'

        // variables to later store the last sentence and the sender
        var uname
        var utype
        var umsg

        switch (data.type) {
            case 'join':
                // If the type is join I just add the client to our list
                connections[data.name] = connection
                msg = '{"type": "join", "names": ["' + Object.keys(connections).join('","') + '"]}'
                if (myBot.connected === false) {
                    myBot.connect()
                }

                break
            case 'msg':
                // Create a message in JSON with type, sender and content
                msg = '{"type": "msg", "name": "' + name + '", "msg":"' + data.msg + '"}'
                utype = 'msg'
                uname = name
                umsg = data.msg
                break
        }

        // Send all data to all connected sockets
        for (var key in connections) {
            if (connections[key] && connections[key].send) {
                connections[key].send(msg)
            }
        }

        // Forward the user's data to the bot so it can respond
        if (uname !== 'MegaBot' && utype === 'msg') {
            var test = myBot.post(umsg)
        }
    })
})