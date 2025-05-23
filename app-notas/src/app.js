import express from "express";
import cors from "cors";
import fs from "fs";

const tasks = JSON.parse(fs.readFileSync("./src/tasks.json", "utf-8"));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
