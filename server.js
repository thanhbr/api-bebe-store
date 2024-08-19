import express from "express";
import * as dotenv from "dotenv";
import {
    userRouter,
    studentRouter
} from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";

dotenv.config();

const app = express();
app.use(checkToken);
app.use(express.json());
const port = process.env.PORT ?? 3000;

app.use("/users", userRouter);
app.use("/students", studentRouter);
app.get("/", (req,res) => {
    res.send("This is a response");
})

app.listen(port, async() => {
    await connect();
    console.log(`listening on port: ${port}`)
});