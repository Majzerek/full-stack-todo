import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import { authenticateToken } from "./middleware/jwt";
import router from "./routes/router";

dotenv.config();

const whitelist = ["http://localhost:5173", "http://127.0.0.1:5137"];
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT = process.env.PORT || 4040;
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
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const useRoutes = router;

const serverStart = async () => {
  try {
    app.use("/", useRoutes);

    app.use("/user", useRoutes);

    app.use("/users", useRoutes);

    app.use("/task", authenticateToken, useRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server Error: ", err);
  }
};

serverStart();
