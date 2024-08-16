import express from "express";
import * as dotenv from "dotenv";
import {
    userRouter,
    studentRouter
} from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use("/users", userRouter);
app.use("/students", studentRouter);
app.get("/", (req,res) => {
    res.send("This is a response");
})

app.listen(port, async() => {
    console.log(`listening on port: ${port}`)
});