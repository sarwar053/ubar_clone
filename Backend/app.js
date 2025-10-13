const dotenv = require('dotenv').config();
const cors = require('cors')
const express =require('express');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(userRoutes)


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/users',userRoutes)

module.exports = app