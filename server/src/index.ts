import cors, { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';


configDotenv();

const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5137'];
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


const serverStart = async () => {

  try {
    const routerCredential = require('./routes/User');


    app.use('/', routerCredential);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  }

  catch (err) {
    console.log("Server Error: ", err)
  }
}

serverStart();