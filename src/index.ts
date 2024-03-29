import { config } from 'dotenv';
import express from 'express';
import { dbConnection } from './app/database/config';
import cors from 'cors';
import {
    authRouter,
    doctorRouter,
    hospitalRouter,
    todoRouter,
    uploadRouter,
    userRouter,
} from './app/routes';

// connecting to mongo database
dbConnection();

const port = config().parsed?.PORT || 3000;

const app = express();
//middlewares
app.use(cors());

app.use(express.static(__dirname + '/app/public'));

app.use(express.json());


//routes
app.use("/api/users", userRouter);
app.use("/api/login", authRouter);
app.use("/api/hospitals", hospitalRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/todos", todoRouter);
app.use("/api/uploads", uploadRouter);

//starting server
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
