const gameRepo = require('./game.memory.repository');

const read = ip => gameRepo.getGameByIp(ip);

const create = data => gameRepo.createGame(data);

const update = (ip, data) => gameRepo.updateCredits(ip, data);

const increase = (ip, coins) => gameRepo.increase(ip, coins);

const decrease = (ip) => gameRepo.decreaseCoins(ip);

const start = () => gameRepo.startGame();

module.exports = { read, create, update, increase, decrease, start };