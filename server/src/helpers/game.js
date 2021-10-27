const crypto = require("crypto");

const getSlots = () => {
    const a = parseInt(crypto.randomBytes(4).toString('hex'), 16);

    const arr = [];

    for (let i = 0; i < 3; i++) {
        const index = getRandomNumberBetween(0, String(a).split('').length);
        arr.push(index)
    }
    function getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return arr;
}

const findUnique = (indexes) => [...new Set(indexes)];

const randomBoolean = (value) => Math.random() < value;

module.exports = { getSlots, findUnique, randomBoolean };

