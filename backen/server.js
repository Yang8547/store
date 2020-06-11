const express = require('express');
const data = require('./data');

// define app by running express function
const app = express();

// create end point
app.get("/api/products",(req, res)=> {
    res.send(data.products)
})

// run the server
app.listen(5000, ()=>{
    console.log("app listening at http://localhost:5000")
})

