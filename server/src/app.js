const express = require('express');

const router = require('./game_controller/game/game.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/game', router);

module.exports = app;