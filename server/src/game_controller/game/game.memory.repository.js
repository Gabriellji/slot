const { DB } = require('../../common/memory.db');
const { getSlots } = require('../../helpers/game');

const getGameByIp = ip => {
  const game = DB.game.find(el => el.ip === ip)
  return game;
}

const createGame = game => {
  DB.game.push(game);
  const { ip } = game;
  const newGame = getGameByIp(ip);
  return newGame;
}; 

const updateCredits = (ip, dataToUpdate) => {
  const game = getGameByIp(ip);
  game.credits = dataToUpdate.credits
  return game;
}

const increase = (ip, coins) => {
    let { credits } = getGameByIp(ip);
    credits = credits + coins;
    return credits;
}

const decreaseCoins = (ip) => {
    let { credits } = getGameByIp(ip);
    credits = credits - 1;
    return credits;
}

const startGame = () => getSlots();



module.exports = { getGameByIp, createGame, updateCredits, increase, decreaseCoins, startGame };