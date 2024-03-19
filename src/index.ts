import { config } from 'dotenv';
import express from 'express';
import { dbConnection } from './app/database/config';
import { userRouter } from './app/routes/user.route';
import cors from 'cors';

dbConnection();

const port = config().parsed?.PORT || 3000;

const app = express();
//middlewares
app.use(cors());
app.use(express.json());

// dbConnection();

//routes
app.use("/api/users", userRouter);

//starting server
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
