const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routers/router');
const DB = require('./models/dbConnect');

const port = process.env.port || 5000;
DB();

app.listen(port, ()=>{
    console.log(`i am listening to port ${port}`)
})

app.use(express.json());
app.use('/api', router)