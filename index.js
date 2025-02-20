const express=require('express')
const dotenv=require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const authroute=require('./route/auth.route');
const taskroute=require('./route/task.route');

const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  


app.use('/api/auth', authroute);
app.use('/api/task', taskroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
