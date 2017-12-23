var express = require('express');
var path = require('path');
var friendsData = require("../data/friends.js");

var router = express.Router();

router.get("/friends", function(req, res) {
    res.json(friendsData);
}); 

router.post("/friends", function(req, res) {
    var newFriend = req.body;
    var match = friendFinder(friendsData, newFriend);
    res.json(match);
    friendsData.push(newFriend);
});

function friendFinder(friendsData, newFriend) {
    var match = [];
    var highScore = 0;
    friendsData.forEach(function(elem) {//first loop to find high score
        var newScore = compareScores(elem, newFriend);
        elem.score = newScore;
        if (newScore > highScore) {
            highScore = newScore;
        }
    });
    friendsData.forEach(function(elem) {//second loop to find all with matching highscore
        if (elem.score === highScore) {
            delete elem.score;//remove score from object cus user doesn't need to know this number
            match.push(elem);//push friend to matches array if highscore is equal to this matches score
        }
    });
    return (match.length > 1) ? match[Math.floor(Math.random() * match.length)] : match[0];
}

function compareScores(friendOne, friendTwo) {
    var total = 0;
    for (var i = 0; i < friendOne.scores.length; i++) {
        total += Math.abs(friendOne.scores[i] - friendTwo.scores[i])
    }
    return total;
}

module.exports = router;