import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import coockieParser from 'cookie-parser';
import coockieSession from 'cookie-session';
import routerAuth from './routes/authRoutes';

dotenv.config();

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5137'];
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200
};

app.use(
  cors(corsOptions)
);
app.use(coockieParser());
app.use(coockieSession({
  name: 'Session',
  keys: ['token', 'userName'],
  maxAge: 1000 * 60 * 60 * 24 // 1 day
}));

const serverStart = async () => {

  try {
    app.use('/', routerAuth);
   


    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  }

  catch (err) {
    console.error("Server Error: ", err);
  }
};

serverStart();