const express = require('express');
const router = express.Router();
const User = require('../model/schema');
const bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var mongoose = require('mongoose');


router.get('/users', (req, res) => {
    User.find({}, function (err, result) {
        res.json(result);
    })
});


router.post('/users', jsonParser, (req, res) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        mobile: req.body.mobile,
        skills: req.body.skills,
    })
    newUser.save().then((result) => {
        res.json(result);
    }).catch(err => console.log(err))
});


router.delete('/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.json(result);
    }).catch(err => console.log(err));
});


router.put('/users/:id', jsonParser, (req, res) => {
    User.updateOne({ _id: req.params.id }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            age: req.body.age,
            mobile: req.body.mobile,
            skills: req.body.skills,
        }
    }).then((result) => {
        res.json(result);
    }).catch(err => console.log(err))
})

module.exports = router;