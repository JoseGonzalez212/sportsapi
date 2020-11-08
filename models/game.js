const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    Team: {
        type: String
    },
    MatchUp: {
        type: String
    },
    GameDate: {
        type: String
    },
    WL: {
        type: String
    },
    MIN: {
        type: String
    },
    PTS: {
        type: String
    },
    FGM: {
        type: String
    },
    FGA: {
        type: String
    },
    FG: {
        type: String
    },

    ThreePM: {
        type: String
    },
    ThreePA: {
        type: String
    },
    ThreeP: {
        type: String
    },
    FTM: {
        type: String
    },
    FTA: {
        type: String
    },
    FT: {
        type: String
    },
    OREB: {
        type: String
    },
    DREB: {
        type: String
    },
    REB: {
        type: String
    },
    AST: {
        type: String
    },
    STL: {
        type: String
    },
    BLK: {
        type: String
    },
    TOV: {
        type: String
    },
    PF: {
        type: String
    },
    PlusMinus: {
        type: String
    },
    OFFRTG: {
        type: String
    },
    DEFRTG: {
        type: String
    },
    NETRTG: {
        type: String
    },
    AST: {
        type: String
    },
    ASTTO: {
        type: String
    },
    ASTRATIO: {
        type: String
    },
    OREB: {
        type: String
    },
    DREB: {
        type: String
    },
    REB: {
        type: String
    },
    TOV: {
        type: String
    },
    EFG: {
        type: String
    },
    TS: {
        type: String
    },
    PACE: {
        type: String
    },
    PIE: {
        type: String
    },
    live: {
        type: String
    },
    currentScore: {
        type: String
    }

});

module.exports = mongoose.model('Game', gameSchema);