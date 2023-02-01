'use strict'

var WebSocketClient = require('websocket').client
var data = require('./intents.json')
const { $dataMetaSchema } = require('ajv');
const { range, isArray } = require('lodash');
const { Console } = require('console');
const { number } = require('prop-types');

/**
* bot is a simple websocket chat client
 */

class bot {
  tempIntents = [];
  passengerName = "";
  lastDigits = "";
  passpoerNo = "";
  want = "";
  fromCountry = "";
  fromCity = ""
  toCountry = "";
  toCity = "";
  checkInDate = "";
  checkInTime = "";
  nights = "";
  phoneNo = "";
  email = "";
  /**
      * Constructor builds the client. It creates a websocket and connects to the server
      * Please note that the server IP is hardcoded. You have to implement it
      */
  constructor() {
    this.dict = data


    /** The websocket connection
     * 
          */
    this.client = new WebSocketClient()
    /**
* If the websocket is connected, then we set it to true
     */
    this.connected = false

    /**
* If the connection fails, the call goes here
     */
    this.client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString())
    })

    /** 
* When the client connects to the server, we're here
    */
    this.client.on('connect', function (connection) {
      this.con = connection
      console.log('WebSocket Client Connected')
      connection.on('error', function (error) {
        console.log('Connection Error: ' + error.toString())
      })

      /**
              * It is always possible that the client disconnected
              * (typically when the server is down)
             */
      connection.on('close', function () {
        console.log('echo-protocol Connection Closed')
      })

      /** 
        * Here is the core, whenever a message is received, this is where the * message arrives.
      */
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var data = JSON.parse(message.utf8Data)
          console.log('Received: ' + data.msg + ' ' + data.name)
        }
      })

      /** 
        * Here we send our identifier so that the server recognizes us.
        * We format the identifier as JSON
      */
      function joinGesp() {
        if (connection.connected) {
          connection.sendUTF('{"type": "join", "name":"MegaBot"}')
        }
      }
      joinGesp()
    })
  }

  /**
  * Method to connect to the server. note that we use localhost
   * 
   */
  connect() {
    this.client.connect('ws://localhost:8181/', 'chat')
    this.connected = true
  }

  /** 
* Your processing logic must be integrated here.
    * This function is automatically called in the server when something arrives that we
    * did not write
    * @param message the bot should respond to
  */
  post(nachricht) {
    var name = 'MegaBot'
    var helpInhalt = ["Sorry I'm not trained enough to understand that!.", "Can't understand that.", "I don't know how to respond to that", "Sorry, I can't undertand that", "I wish i had enough data to respond to that information", "I am not taught to repond to that", "I don't understand that. Do you want to book a flight? if yes say <b>restart</b>."];
    var inhalt = helpInhalt[helpInhalt.length * Math.random() | 0];

    if (nachricht == "help") {
      var helpString = "";
      var commands = [];
      for (var i in this.dict) {
        commands[i] = this.dict[i].intents
      }
      for (var i in commands) {
        helpString = helpString + "<b>" + i + ":</b> " + commands[i] + " <br>";
      }

      inhalt = "Hi! This is MegaBot. The bot is about Flight Booking and more. <br>You can use various commands to use it. Say <b>restart</b> to restart the bot. More commands are explained below <br>" + helpString + "<br>If any of above command is a part of your input the bot will recognize it and reply accordingly.";
    }

    if (nachricht == "restart") {
      this.passengerName = "";
      this.lastDigits = "";
      this.passpoerNo = "";
      this.phoneNo = "";
      this.email = "";
      this.want = "";
      this.fromCountry = "";
      this.fromCity = ""
      this.toCountry = "";
      this.toCity = "";
      this.checkInDate = "";
      this.checkInTime = "";
      this.nights = "";

      inhalt = "Do you want to Book a flight? [yes/no]";
    }
    else if (this.want == "" && nachricht == 'no') {
      this.want = 'no';
      inhalt = "Welcome to MegaBot, Type <b>Help</b> to know about us!";
    }
    else if ((this.want == "") && (nachricht == 'yes')) {
      this.want = 'yes'
      inhalt = "OK!, What is your full name?"
    }
    else if (this.want == 'yes' && this.passengerName == "") {
      this.passengerName = nachricht;
      inhalt = "What are the last 4 digits of your card? [Digits]";
    }
    else if (this.want == 'yes' && this.lastDigits == "") {
      this.lastDigits = nachricht;
      inhalt = "What is your passport number? [Passport No.]";
    }
    else if (this.want == 'yes' && this.passpoerNo == "") {
      this.passpoerNo = nachricht;
      inhalt = "What country are you in? [Country]";
    }
    else if (this.want == 'yes' && this.fromCountry == "") {
      this.fromCountry = nachricht;
      inhalt = "What city?? [City]";
    }
    else if (this.want == 'yes' && this.fromCity == "") {
      this.fromCity = nachricht;
      inhalt = "Where are you heading to? [Country]";
    }
    else if (this.want == 'yes' && this.toCountry == "") {
      this.toCountry = nachricht;
      inhalt = "What City? [City]";
    }
    else if (this.want == 'yes' && this.toCity == "") {
      this.toCity = nachricht;
      inhalt = "What Date? [Date]";
    }
    else if (this.want == 'yes' && this.checkInDate == "") {
      this.checkInDate = nachricht;
      inhalt = "What time [Time]";
    }
    else if (this.want == 'yes' && this.checkInTime == "") {
      this.checkInTime = nachricht;
      inhalt = "How many nights? [Number]";
    }
    else if (this.want == 'yes' && this.nights == "") {
      this.nights = nachricht;
      inhalt = "What is your phone number? [Number]";
    }
    else if (this.want == 'yes' && this.phoneNo == "") {
      this.phoneNo = nachricht;
      inhalt = "What is your email address? [email]";
    }
    else if (this.want == 'yes' && this.email == "") {
      this.email = nachricht;
      var helpReply = "According to your inputs you want to book a flight. The passenger name is <b>" + this.passengerName + "</b> " + "the last 4 digits of your card are <b>" + this.lastDigits + "</b>. Passport Number is <b>" + this.passpoerNo + "</b>. You are leaving from <b>" + this.fromCity + ", " + this.fromCountry + "</b> to <b>" + this.toCity + ", " + this.toCountry + "</b>. Your check in Time is <b>" + this.checkInTime + "</b> on <b>" + this.checkInDate + "</b>. You are staying there for <b>" + this.nights + "</b> nights.";
      inhalt = "OK! You flight booking is in process, Our Team will verify your details and reach you out soon at<b> " + this.email + "</b> or <b>" + this.phoneNo + "</b> " + helpReply + " <br>If you think any of the above detail is wrong Type <b>restart</b> to start the booking process again. <br>Type <b>Help</b> for more usages about the bot!";
    }
    else {
      this.want = "no";
      for (var currentKey in this.dict) {
        this.tempIntents = this.dict[currentKey].intents;
        for (var currentIntent in this.tempIntents) {
          if (nachricht.includes(this.tempIntents[currentIntent])) {
            var tempAnswers = [];
            for (var currentAnswer in this.dict[currentKey].answer) {
              tempAnswers[currentAnswer] = this.dict[currentKey].answer[currentAnswer];
            }
            inhalt = tempAnswers[tempAnswers.length * Math.random() | 0];
          }
        }
      }
    }
    /*
      * Processing
    */

    var msg = '{"type": "msg", "name": "' + name + '", "msg":"' + inhalt + '"}'
    console.log('Send: ' + msg)
    this.client.con.sendUTF(msg)
  }

}

module.exports = bot
