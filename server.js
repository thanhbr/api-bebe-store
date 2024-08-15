import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./routes/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use("/users", userRouter);
app.get("/", (req,res) => {
    res.send("This is a response");
})

app.listen(port, async() => {
    console.log(`listening on port: ${port}`)
});