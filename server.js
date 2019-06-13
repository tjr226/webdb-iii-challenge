const express = require('express');
const server = express();
const helmet = require('helmet');

server.use(express.json());
server.use(helmet());
server.use(logger);

const cohortRoutes = require('./routes/cohortRoutes');
const studentRoutes = require('./routes/studentRoutes');

server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);


function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`)
    next();
  }

module.exports = server;