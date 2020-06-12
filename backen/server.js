const express = require('express');
const data = require('./data');

// define app by running express function
const app = express();

// create end point
app.get("/api/products",(req, res)=> {
    res.send(data.products)
})
app.get("/api/product/:id",(req, res) => {
    const pid = req.params.id;
    const product = data.products.find((item) => item._id == pid)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg:"Product not found!"})
    }
})

// run the server
app.listen(5000, ()=>{
    console.log("app listening at http://localhost:5000")
})

