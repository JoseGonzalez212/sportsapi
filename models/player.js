const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  Player: {
      type: String
  },
  Drafted: {
    type: String
  },
  College: {
    type: String
  },
  Team: {
    type: String
  },
  GP: {
    type: String
  },
  MPG: {
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
  TOV: {
    type: String
  },
  PF: {
    type: String
  },
  ORB: {
    type: String
  },
  DRB: {
    type: String
  },
  RPG: {
    type: String
  },
  APG: {
    type: String
  },
  SPG: {
    type: String
  },
  BPG: {
    type: String
  },  
  PPG: {
    type: String
  },
  TS: {
    type: String
  },	
  eFG: {
    type: String
  },
  TotalS: {
    type: String
  },
  ORB: {
    type: String
  },	
  DRB: {
    type: String
  },
  TRB: {
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
  USG: {
    type: String
  },	
  PPR: {
    type: String
  },	
  PPS: {
    type: String
  },	
  ORtg: {
    type: String
  },	
  DRtg: {
    type: String
  },	
  eDiff: {
    type: String
  },	
  FIC: {
    type: String
  },	
  PER: {
    type: String
  },

  Age: {
    type: String
  },

  W: {
    type: String
  },
  L: {
    type: String
  },
  MIN: {
    type: String
  },
  PTS: {
    type: String
  },
  OREB: {
    type: String
  },
  REB: {
    type: String
  },
  FP: {
    type: String
  },
  DDTwo: {
    type: String
  },
  TDThree: {
    type: String
  },
  PlusMinus: {
    type: String
  },

});

module.exports = mongoose.model('Player', playerSchema);