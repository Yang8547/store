const express = require('express');
const data = require('./data');
const config = require('./config');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRouter');

// connect mongo DB
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl,{
    useNewUrlParser: true
}).then(()=>{
    console.log("DB CONNECTED");
})
.catch(error=>{console.log(error)}
);

// define app by running express function
const app = express();

app.use(express.json({
    limit:'50mb'
}))
app.use(express.urlencoded({
    limit:'50mb',
    extended:true
}))

// create end point
app.use('/api/v1/users', userRouter);
app.use('/api/products', productRouter);
// app.get("/api/products",(req, res)=> {
//     res.send(data.products)
// })
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

