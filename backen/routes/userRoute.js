const express = require('express');
const userModel =  require('../models/userModel');

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

module.exports = router;