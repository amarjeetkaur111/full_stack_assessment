
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes =  require('./routes/userRoute');
const cors = require('cors');

const app = express();

//dotenv config
dotenv.config();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(morgan("dev"));
app.use(express.json()); 
app.use(cors());

//User routes
app.use('/user',userRoutes);    


app.get('/test',(req,res) => {
    res.status(200).send("<h1>Testing site</h1>");
})

app.listen(PORT, (error) => {
    if(!error)
        console.log(`Merchant Server is successfully running at port ${PORT}`);
    else
        console.log(`Error occuring at port ${PORT}`);
})