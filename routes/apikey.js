var express = require('express');
var router = express.Router();
const apikey = require('../models/apikey');

// Get one user
router.get('/:username', getUserWithEmail, (req, res) => {
    res.send(res.user);
});

// Create one
router.post('/', async (req, res) => {
    const userValues = new apikey({
        ...req.body
    });
    try {
        const newUser = await apikey(userValues).save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
})

async function getUser(req, res, next) {
    let userFound;
    try {
      userFound = await user.findById(req.params.id);
        if (userFound == null) {
            return res.status(404).json( {message: 'Cannot find team'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
    res.user = userFound;
    next();
}

async function getUserWithEmail(req, res, next) {
    let userFound;
    try {
      userFound = await apikey.find({username: req.params.username});
        if (userFound == null || userFound == []) {
            return res.status(404).json( {message: 'Cannot find team'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
    res.user = userFound;
    next();
}

module.exports = router;