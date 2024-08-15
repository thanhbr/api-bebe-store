import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req,res) => {
    res.send("This is a response");
})

app.listen(port, async() => {
    console.log(`listening on port: ${port}`)
});