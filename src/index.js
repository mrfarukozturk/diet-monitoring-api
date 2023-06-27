import express from 'express';
import "./config/Database.js"
import userRoute from './controller/user-route.js'
//import postRoute from './controller/post-route.js'
//import commentRoute from './controller/comment-route.js'
import mealRouter from './controller/meal-route.js';
import measurementRouter from './controller/measurement-route.js';
import consultationRouter from './controller/consultation-route.js';
import userRelationRouter from './controller/user-relation-route.js'; 


import cors from 'cors'
import morgan from "morgan"
import errorHandler from './middleware/errorHandler.js';
import './config/connection.js';



const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))

// API
app.use("/api/v1/users", userRoute);
app.use("/api/v1/userrelations", userRelationRouter);


app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/measurements", measurementRouter);
app.use("/api/v1/consultations", consultationRouter);

//app.use("/api/v1/posts", postRoute);
//app.use("/api/v1/comments", commentRoute);
app.use(errorHandler)

export default app;