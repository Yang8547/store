const express = require('express');
const userModel =  require('../models/userModel');
const getToken = require('../util');

const router = express.Router();


router.post('/addAdmin', (req,res)=>{
    const admin =  new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin:true
    })
    admin.save().then(data=>{
        res.send({
            id: data._id,
            name: data.name,
            email: data.email,
            isAdmin:data.isAdmin
        })
    }).catch(error=>{
        console.error(error.message)
    })
})

// signin
router.post('/signin', (req, res) => {
    userModel.findOne({
      email: req.body.email,
      password: req.body.password
    }).then(data=>{
        res.send({
            _id: data.id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
            token: getToken(data)
        })
    }).catch(error=>{
        res.status(401).send({ msg: 'Invalid Email or Password.' });
    })
})
// register
router.post('/register', (req, res) => {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    user.save().then(data=>{
        res.send({
            _id: data.id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
            token: getToken(data)
        })
    }).catch(error=>{
        res.status(401).send({ msg: 'Invalid User Data.' });
    })
})


  

module.exports = router;