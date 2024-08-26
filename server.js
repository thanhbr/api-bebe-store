import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import connect from "./database/database.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => console.log(`listening on port: ${port}`));
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer();
