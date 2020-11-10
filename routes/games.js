const { response } = require('express');
var express = require('express');
var router = express.Router();
var path = require('path');
const { subscribe } = require('.');
const game = require("../models/game");
const team = require('../models/team');


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
                let newGameS = {
                    MatchUp: games[i].MatchUp,
                    GameDate: games[i].GameDate,
                    currentScore: games[i].currentScore
                }

                liveGames.push(newGameS)
            }
        }
        // add prediction to each live game

        for (let i = 1; i < liveGames.length; i++) {
            let newPrediction = await getPrediction(games, liveGames, i)
            console.log("new pred " + newPrediction)
            //liveGames[i].predictedWinner = newPrediction + ""

            // // get frist team data
            // let team1 = getTeam(games, liveGames[i].MatchUp.split(" vs. ")[0])

            // let {PythonShell} = require('python-shell')
            // //let pyshell = new PythonShell('/mnt/c/Users/Jose/Desktop/SeniorProject/sportsapi/python/modal.py');
            // let pyshell = new PythonShell(`\python\\modal.py`);
            // console.log(Object.values(team1))
            // pyshell.send(JSON.stringify(Object.values(team1)))

            // pyshell.on('message', function (message) {
            //     console.log("getting message")
            //     console.log("Node: " + message)
            //     liveGames[i].predictedWinner = message
            // })

            // pyshell.end(function (err) {
            //     console.log(err)
            //     console.log('fin')
            // })

        }
        console.log("DONE")
        console.log(liveGames)
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

function getTeam(games, MatchUp) {
    let newTest;
    for (let i = 1; i < games.length; i++) {
        if (games[i].Team == MatchUp) {
            newTest = games[i]
            break;
        }
    }
    let modalGame = {
        "FGM": newTest.FGM,
        "FGA": newTest.FGA,
        "FG": newTest.FG,
        "ThreePM": newTest.ThreePM,
        "ThreePA": 42,
        "ThreeP": newTest.ThreeP,
        "FTM": newTest.FTM,
        "FTA": newTest.FTA,
        "FT": newTest.FT,
        "OREB": newTest.OREB,
        "DREB": newTest.DREB,
        "REB": newTest.REB,
        "AST": newTest.AST,
        "STL": newTest.STL,
        "BLK": newTest.BLK,
        "TOV": newTest.TOV,
        "PF": newTest.PF,
        "PlusMinus": newTest.PlusMinus,
        "OFFRTG": newTest.OFFRTG,
        "DEFRTG": newTest.DEFRTG,
        "NETRTG": newTest.NETRTG,
        "AST": newTest.AST,
        "ASTTO": newTest.ASTTO,
        "ASTRATIO": newTest.ASTRATIO,
        "Test": 31,
        "Tesst": 31,
        "Tdfesst": 31,
        "OREB": newTest.OREB,
        "DREB": newTest.DREB,
        "REB": newTest.REB,
        "TOV": newTest.TOV,
        "EFG": newTest.EFG,
        "TS": newTest.TS,
        "PACE": newTest.PACE,
        "PIE": newTest.PIE
    }
    return modalGame
}

 function getPrediction(games, liveGames, i) {

    return new Promise((resolve, reject) => {
        // get frist team data
        let team1 = getTeam(games, liveGames[i].MatchUp.split(" vs. ")[0])

        let {PythonShell} = require('python-shell')
        //let pyshell = new PythonShell('/mnt/c/Users/Jose/Desktop/SeniorProject/sportsapi/python/modal.py');
        let pyshell = new PythonShell(`\python\\modal.py`);
        pyshell.send(JSON.stringify(Object.values(team1)))

         pyshell.on('message', function (message) {
            console.log("getting message")
            console.log("Node: " + message)
            if (message[1] == "1") {
                liveGames[i].predictedWinner = liveGames[i].MatchUp.split(" vs. ")[0]
            } else {
                liveGames[i].predictedWinner = liveGames[i].MatchUp.split(" vs. ")[1]
            }
            
            resolve(message)
            return message
            liveGames[i].predictedWinner = message
        })

         pyshell.end(function (err) {
            console.log(err)
            console.log('fin')
        })
    })

}

module.exports = router;