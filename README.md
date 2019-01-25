# DevConnector
Simple demo of a MERN stack

This project requires a MongoDB host in order to work.

## How to setup
Install packages for both server and client.
```bash
npm i
cd client
npm i
```
Setup a Mongo database somewhere and update config/keys.js with the connection info.

## How to run
Run the Mongo database server.
Run the webserver from the project root directory with:
```bash
npm start dev
```
The console output should say the port the API is running on and give a message that MongoDB is connected.
Run the React client from the project client subdirectory with:
```bash
cd client
npm start
```
A browser window should automatically open. The MERN-based website should be accessible at http://localhost:3000
