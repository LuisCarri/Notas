import { useState } from "react";
import "./App.css";

function Button({ children, onClick }) {
    return (
        <button className="btn" onClick={onClick}>
            {children}
        </button>
    );
}

function Input({ label }) {
    return (
        <>
            <label htmlFor="input">{label}</label>
            <input type="text" id="input" name="input" />
            <input type="submit" value="Submit" />
        </>
    );
}

function Card({ children }) {
    return <div className="card">{children}</div>;
}

function Task({ title, isCompleted, onComplete }) {
    return (
        <Card>
            {isCompleted ? (
                <s>{title}</s>
            ) : (
                <>
                    {title}
                    <Button onClick={onComplete}>
                        <p>Marcar tarea como completada</p>
                    </Button>
                </>
            )}
        </Card>
    );
}

function ListOfTasks({ tasks, onComplete }) {
    return (
        <div>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    title={task.title}
                    isCompleted={task.completed}
                    onComplete={() => onComplete(task.id)}
                />
            ))}
        </div>
    );
}

function App() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputValue = formData.get("input");
        setTasks([
            ...tasks,
            { id: tasks.length + 1, title: inputValue, completed: false },
        ]);
    };

    const recoverCompletedTasks = () => {
        const completed = tasks.filter((task) => task.completed);
        setCompletedTasks(completed);
    };

    const markTaskAsCompleted = (id) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            )
        );
        recoverCompletedTasks();
    };

    return (
        <div className="App">
            <ListOfTasks tasks={tasks} onComplete={markTaskAsCompleted} />
            <form onSubmit={handleSubmit}>
                <Input label="Ingresa una nueva tarea:" />
            </form>
            <h1>Lista de tareas completadas</h1>
            <ListOfTasks tasks={completedTasks} />
        </div>
    );
}

export default App;
