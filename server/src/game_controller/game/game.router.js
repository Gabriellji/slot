const router = require('express').Router();
const gameService = require('./game.service');
const { findUnique, randomBoolean } = require('../../helpers/game');
const { CREDITS } = require('../../common/memory.db');

const start = (ip, credits, data) => {
    console.log('START')
    let random = gameService.start();
    let result = findUnique(random);
    console.log('RANDOM',random, 'RESULT', result);
    if (result.length < 2) {
        console.log('IF WIN')
        if (credits > 60) {
            console.log('IF CRED > 60')
            if (randomBoolean(0.6)) {
                console.log('TRUE 60%')
                start(credits);
            } else {
                console.log('INCREASE + 20')
                data.credits = gameService.increase(ip, 20);
            }
        } else if (credits > 40 && credits < 60) {
            console.log('IF CRED BEETWEEN 40 and 60')
            if (randomBoolean(0.3)) {
                console.log('TRUE 30%')
                start(credits);
            } else {
                console.log('EEELSE JUST INCREASE')
                data.credits = gameService.increase(ip, 20);
                return;
            }
        } else if (credits < 40) {
            console.log('IF CRED less 40 INCREASE + 20')
            data.credits = gameService.increase(ip, 20);
            return;
        }
    } else {
        console.log('LOOOOSERRRR')
        data.credits = gameService.decrease(ip);
        return;
    }
}


router.route('/:ip').get((req, res) => {
    try {
        const { ip } = req.params;
        const game = gameService.read(ip);
        if (!game) {
            return res.status(404);
        }
        return res.status(200).json(game);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.route('/').post((req, res) => {
    try {
        const { ip } = req;
        const { username } = req.body;
        const game = gameService.create(
            {
                username,
                ip,
                credits: CREDITS
            }
        );
        return res.status(201).json(game);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

router.route('/:ip').put((req, res) => {
    try {
        const ip = req.params;

        const game = gameService.read(ip.ip);

        if(game.credits == 0) {
            return res.status(404).send('Not enough credits!');;
        }

        start(ip.ip, game.credits, game);

        const updatedGame = gameService.update(ip.ip, game);

        return res.status(200).json(updatedGame);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

module.exports = router;