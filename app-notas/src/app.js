import express from "express";
import cors from "cors";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("./src/tasks.json", "utf-8"));
const tasks = data.tasks;

const app = express();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.json(tasks);
});

app.post("/", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
    };
    tasks.push(newTask);
    fs.writeFileSync("./src/tasks.json", JSON.stringify({ tasks }, null, 2));
    res.status(201).json(newTask);
});

app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = tasks.findIndex((task) => String(task.id) === String(id));
    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
    tasks.splice(index, 1);
    fs.writeFileSync("./src/tasks.json", JSON.stringify({ tasks }, null, 2));
    res.status(204).end();
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
