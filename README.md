Contents

[1 Overview](#overview)

[1.1 Project Overview](#project-overview)

[1.2 General Conditions](#general-conditions)

[1.3 Project Participants](#project-participants)

[2 How does it work?](#how-does-it-work)

[3 Application requirements](#application-requirements)

[4 Miscellaneous](#miscellaneous)

[4.1 Additional Requirements](#additional-requirements)

# Overview

## Project Overview

The web application is created on the basic architecture of the submitted Wordspotter. The user interface is attractive and modern. The aim of the web app is to book a flight and do some more common things as a response to the user. The webapp is flexible. The bot can be trained easily but putting more data into the "intents.json" file.

## General Conditions

Users should be wanting to book a flight or have fun with the bot. It is intended for PC/ Laptop users .

## Project Participants

1.  M Noman

# How does it work?

create a local server with the open-source JavaScript runtime environment "node.js" through a terminal call in the directory of "./staticExpress.js" and the command "node staticExpress.js" on the local computer. This can be done using VS Code. The server will be connected which later is accessible via localhost :8080. Visual Studio Code is used as the IDE.

The user interface of the project consists of " ./index.html", "./images/images.png" and "./css/style.css ". The backend consists of the follwing files

1.  " bot.js ", which compares the sent message with the " intents" of "intents.json" and returns the corresponding "answer " to "index.html". If sent message does not exisit in the answer, a fallback response will be returned.
2.  "staticExpress" which builds the local server and also involves the Express – Node.js framework
3.  "intents.json" which works like a database and responds to "intents" / keywords like "hi", "bye", "joke" and "who are you" etc. The ChatHTMLSpotter can filter out the " intents " from the entered and sent message and then returns the corresponding random answer. However, if the message sent by the user does not exist in the database, a random fallback response is sent back.

This program works on all operating systems. It was developed partly under Windows 11. It is mainly designed for the PC users.

# Application requirements

Node.js must be installed. No existing internet connection is required as it is hosted locally.

The application has to be operated mainly with the keyboard as the user must input something to send to the bot. The enter button from the keyboard can be used to send the typed message and mouse can also be used to click on the "send" button.

The corporate identity is represented by a simple color gradient in the background from light green to forest green. This should represent the color of the forest and the trees or the earth and should be more authentic and empathetic for the user.

The elements should be simplicity and also visually appealing due to the rounded corners. The left element is the text output field and is represented by a shade of brown that is intended to remind of trees. The rightmost element, on the other hand, is set to the opposite background color in contrast to the background. In the center is a scroll with instructions, designed to evoke times long past.

# Miscellaneous

## Additional Requirements

There is no maintenance, service and hosting effort as it is a local server. All you have to do is install the above libraries and everything else is stored locally.
