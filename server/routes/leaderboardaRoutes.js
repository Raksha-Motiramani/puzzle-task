const express = require('express');
const Leaderboard = require('../models/leaderboard');

const router = express.Router();

// GET /leaderboard - get the leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.aggregate([
            { $group: { _id: "$username", score: { $max: "$score" } } },
            { $sort: { score: -1 } },
            { $limit: 10 }
        ]);
        const formattedLeaderboard = leaderboard.map((entry, index) => {
            return {
                rank: index + 1,
                username: entry._id,
                score: entry.score
            }
        });
        res.json(formattedLeaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    // try {
    //     const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
    //     res.json(leaderboard);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Internal Server Error');
    // }
});

// POST /leaderboard - add a score to the leaderboard
router.post('/', async (req, res) => {
    const { username, score } = req.body;
    try {
        const existingScore = await Leaderboard.findOne({ username });
        if (existingScore) {
            if (score > existingScore.score) {
                existingScore.score = score;
                await existingScore.save();
                res.status(201).send('Score updated on leaderboard');
            } else {
                res.status(201).send('Score not added to leaderboard');
            }
        } else {
            const leaderboard = new Leaderboard({ username, score });
            await leaderboard.save();
            res.status(201).send('Score added to leaderboard');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }



    // try {
    //     const leaderboard = new Leaderboard({ username, score });
    //     await leaderboard.save();
    //     res.status(201).send('Score added to leaderboard');
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Internal Server Error');
    // }
});

module.exports = router;