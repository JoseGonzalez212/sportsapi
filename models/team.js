const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    ranking: {
        type: String
    },
    team: {
        type: String
    },
    Conference: {
        type: String
    },
    GP: {
        type: String
    },
    W: {
        type: String
    },
    L: {
        type: String
    },
    WIN: {
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
    TOV: {
        type: String
    },
    STL: {
        type: String
    },
    BLK: {
        type: String
    },
    BLKA: {
        type: String
    },
    PF: {
        type: String
    },
    PFD: {
        type: String
    },
    PlusMinus: {
        type: String
    }
});

module.exports = mongoose.model('Team', teamSchema);