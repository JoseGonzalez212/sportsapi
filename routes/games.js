var express = require('express');
var router = express.Router();
var path = require('path');
const { subscribe } = require('.');
const game = require("../models/game");

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get all games
router.get('/live', async (req, res) => {
    try {
        const games = await game.find();
        let liveGames = []
        for (let i = 0; i < games.length; i++) {
            if (games[i].live == "live") {
                liveGames.push(games[i])
            }
        }

        // add prediction to each live game
        res.json(liveGames);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get all games for year
router.get('/year/:year', async (req, res) => {
    try {
        const games = await game.find({Season: req.params.year});
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get all games for team
router.get('/team/:team', async (req, res) => {
    try {
        const games = await game.find({$or:[{HomeTeam: req.params.team},{VistorTeam:req.params.team}]});
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get one game
router.get('/:id', getGame, (req, res) => {
    res.send(res.game);
});

// Create one
router.post('/', async (req, res) => {
    const gameValues = new game({
        Team: req.body.Team,
        MatchUp: req.body.MatchUp,
        GameDate: req.body.GameDate,
        WL: req.body.WL,
        MIN: req.body.MIN,
        PTS: req.body.PTS,
        FGM: req.body.FGM,
        FGA: req.body.FGA,
        FG: req.body.FG,
        ThreePM: req.body.ThreePM,
        ThreePA: req.body.TheePA,
        ThreeP: req.body.ThreeP,
        FTM: req.body.FTM,
        FTA: req.body.FTA,
        FT: req.body.FT,
        OREB: req.body.OREB,
        DREB: req.body.DREB,
        REB: req.body.REB,
        AST: req.body.AST,
        STL: req.body.STL,
        BLK: req.body.BLK,
        TOV: req.body.TOV,
        PF: req.body.PF,
        PlusMinus: req.body.PlusMinus,
        OFFRTG: req.body.OFFRTG,
        DEFRTG: req.body.DEFRTG,
        NETRTG: req.body.NETRTG,
        AST: req.body.AST,
        ASTTO: req.body.ASTTO,
        ASTRATIO: req.body.ASTRATIO,
        OREB: req.body.OREB,
        DREB: req.body.DREB,
        REB: req.body.REB,
        TOV: req.body.TOV,
        EFG: req.body.EFG,
        TS: req.body.TS,
        PACE: req.body.PACE,
        PIE: req.body.PIE,
        live: req.body.live,
        currentScore: req.body.currentScore
    });
    try {
        const newGame = await game(gameValues).save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
})

// update one
router.patch('/:id', getGame, (req, res) => {
    // if new attributes added to model then need more if statements
    if (req.body.GameDate) {
        res.game.GameDate = req.body.GameDate;
    }

    if (req.body.GameStatus) {
        res.game.GameStatus = req.body.GameStatus;
    }

    if (req.body.HomeTeam) {
        res.game.HomeTeam = req.body.HomeTeam;
    }

    if (req.body.VistorTeam) {
        res.game.VistorTeam = req.body.VistorTeam;
    }

    if (req.body.Season) {
        res.game.Season = req.body.Season;
    }

    if (req.body.WinnerTeam) {
        res.game.WinnerTeam = req.body.WinnerTeam;
    }

    if (req.body.HomeTeamPoints) {
        res.game.HomeTeamPoints = req.body.HomeTeamPoints;
    }

    if (req.body.VistorTeamPoints) {
        res.game.VistorTeamPoints = req.body.VistorTeamPoints;
    }

    if (req.body.predictedWinner) {
        res.game.predictedWinner = req.body.predictedWinner;
    }

    res.game.save();
    res.send(res.game);
    
});

async function getGame(req, res, next) {
    let gameFound;
    try {
        gameFound = await game.findById(req.params.id);
        if (gameFound == null) {
            return res.status(404).json( {message: 'Cannot find game'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
    res.game = gameFound;
    next();
}

module.exports = router;