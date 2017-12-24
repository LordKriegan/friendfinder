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

function friendFinder(friends, newFriend) {
    var highScore = 0;
    friends.map(function(elem) {//compare scores with everyone in database
        var newScore = compareScores(elem, newFriend);
        elem.matchScore = newScore;
        if (newScore > highScore) {
            highScore = newScore;
        }
    });
    friends = friends.filter(function(elem) {//filter out anyone who isnt a high-scorer, have to set it equal to itself as .filter doesn't modify original array
        return (elem.matchScore === highScore);
    });
    friends.map(function(elem) {//remove .matchScore property from all results cus user doesnt need to know this
        delete elem.matchScore;
    });
    return (friends.length > 1) ? friends[Math.floor(Math.random() * friends.length)] : friends[0];
}

function compareScores(friendOne, friendTwo) {
    var total = 0;
    for (var i = 0; i < friendOne.scores.length; i++) {
        total += Math.abs(friendOne.scores[i] - friendTwo.scores[i])
    }
    return total;
}

module.exports = router;