import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRouter.js';

const app = express();
const port = process.env.PORT || 4000;

// 1. Database Connection Call
connectDB(); 

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/auth',userRouter);
app.use('/api/results',resultRouter);

app.get('/', (req, res) => {
    res.send("Api success");
})

app.listen(port, () => {
    console.log(`server started successfully on port ${port}`);
})

