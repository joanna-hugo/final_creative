const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

//
//      Points
//

const pointsSchema = new mongoose.Schema({
    username: String,
    points: Number,
    day: String
});

const Points = mongoose.model('Points', pointsSchema);

//add daily points to the DB
router.post('/', async (req, res) => {
    console.log("updating points for " + req.body.username);
    const points = new Points({
        username: req.body.username,
        points: req.body.points,
        day: req.body.day
    });
      try {
          await points.save();
          return res.send(points);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
});

// get ALL points from the DB
router.get('/', async (req, res) => {
    console.log("getting alll points");
    try{
        let points = await Points.find();
        return res.send(points);
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
});

// router.get('/:id', async (req, res) => {
//     console.log("getting points for user " + req.params.toString());
//     try{
//         let points = await Points.find({
//             username: req.params.username
//         });
//         return res.send(points);
//     }catch(error){
//         console.log(error);   
//     }
// });

module.exports = router;