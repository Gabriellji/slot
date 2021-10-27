const express = require('express');
const cors = require("cors")

const router = require('./game_controller/game/game.router');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
})

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/game', router);

module.exports = app;