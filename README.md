# To-Do-App-Backend

_Backend_

To Do App backend with APIs to create, read, update, delete To Do tasks.
Each To do will have a description, status: pending/done and a unique id.

## Features

- Creates a To-Do and returns it's unique id.
- Get list of all tasks to be done.
- Get Single to do by To-Do id
- Update pending To Do status to Done
- Delete To-Do using it's id.

## Tech used :

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDb](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) - a document database

## Installation

This project requires [Node.js](https://nodejs.org/) v14+ to run.
Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

Create a .env file
The .env file will contain the URI connection string. This contains the user, password, host address as well as database and extra connection options for connecting to your MongoDB database.

```sh
MONGO_URI='mongo+srv://<user>:<pass>@<host>:<port>/<database>?<connection options>'
```

[node.js]: http://nodejs.org
[express]: https://expressjs.com
