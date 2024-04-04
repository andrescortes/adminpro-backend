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

const PORT = process.env.PORT || 3000;

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


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/app/public/index.html');
});
// create all directories for images to storage

//starting server
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
