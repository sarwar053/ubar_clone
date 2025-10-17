const dotenv = require('dotenv').config();
const cors = require('cors')
const express =require('express');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes=require('./routes/captain.routes');

connectToDb();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

module.exports = app