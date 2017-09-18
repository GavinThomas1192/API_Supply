'use strict';

const debug = require('debug')('cfgram:server');

// express setup
const express = require('express');
const router = express.Router();
const app = express();

// mongoose setup
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let mongoConnection = mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// router middleware
require('../route/route-auth')(router);
require('../route/route-gallery')(router);
require('../route/route-photo')(router);

// mount middleware
app.use(require('body-parser').json());
app.use(require('cors')());
app.use(router);

app.all('/*', (req, res) => res.sendStatus(404));

// explicit control over server start and stop
const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        debug(`Listening on ${process.env.PORT}`);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        mongoConnection.close();
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('the server is not running'));
  });
};
