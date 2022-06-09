const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require ('dotenv') ;
const cors = require("cors");
const userRoutes = require ('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log('DB connection succesful')})
    .catch((err)=>{console.log(err)})

app.use(cors());    
app.use(express.json());   

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5000, ()=>{
    console.log('backend is running')
})