import { useState, useEffect } from "react";

function Button({ children, onClick }) {
    return (
        <button
            className="border-2 border-gray-300/20 text-white p-2 rounded-md text-xs"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function Input({ label }) {
    return (
        <div className="flex flex justify-center items-center">
            <label className="m-4" htmlFor="input">
                {label}
            </label>
            <input type="text" id="input" name="input" autoComplete="off" />
            <input
                className="bg-blue-500 text-white p-2 rounded-md text-xs bg-transparent border-2 border-gray-300/20"
                type="submit"
            />
        </div>
    );
}

function Card({ children }) {
    return <div className="card">{children}</div>;
}

function Task({ title, isCompleted, onComplete, onDelete }) {
    if (title === "") {
        return null;
    }
    return (
        <Card>
            {isCompleted ? (
                <div>
                    <s>{title}</s>
                    <Button onClick={onDelete}>
                        <p>Eliminar tarea</p>
                    </Button>
                </div>
            ) : (
                <div className="flex justify-between border-2 border-gray-300 rounded-md p-2 m-6 text-xl">
                    {title}
                    <Button onClick={onComplete}>
                        <p>Marcar tarea como completada</p>
                    </Button>
                </div>
            )}
        </Card>
    );
}

function ListOfTasks({ tasks, onComplete, onDelete }) {
    return (
        <div>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    title={task.title}
                    isCompleted={task.isCompleted}
                    onComplete={() => onComplete(task.id)}
                    onDelete={() => onDelete(task.id)}
                />
            ))}
        </div>
    );
}

function App() {
    const [tasks, setTasks] = useState([]);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = (e) => {
        fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: e.target.input.value,
                isCompleted: false,
                id: tasks.length + 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks((tasks) => [...tasks, data]);
                e.target.reset();
            })
            .catch((err) => console.error(err));
    };

    const markTaskAsCompleted = (id) => {
        fetch(`http://localhost:3000/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: true,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                setTasks((tasks) =>
                    tasks.map((task) =>
                        task.id === id ? { ...task, isCompleted: true } : task
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteTask = (id) => {
        fetch(`http://localhost:3000/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setTasks((tasks) => tasks.filter((task) => task.id !== id));
            })
            .catch((err) => console.error(err));
    };

    const completedTasks = tasks.filter((task) => task.isCompleted);
    const pendingTasks = tasks.filter((task) => !task.isCompleted);

    return (
        <div className="justify-center items-center flex flex-col border-2 border-gray-300/30 rounded-md p-6 m-6 text-xl">
            {pendingTasks.length === 0 ? <h1>Aún no hay tareas</h1> : null}
            <ListOfTasks
                tasks={pendingTasks}
                onComplete={markTaskAsCompleted}
            />
            <form onSubmit={handleSubmit}>
                <Input label="Ingresa una nueva tarea:" />
            </form>
            {completedTasks.length > 0 ? (
                <Button
                    onClick={() => {
                        setShowCompletedTasks(!showCompletedTasks);
                    }}
                >
                    Ver lista de tareas completadas
                </Button>
            ) : null}
            {showCompletedTasks ? (
                <>
                    <h1>Tareas completadas: </h1>
                    <ListOfTasks
                        tasks={completedTasks}
                        onDelete={handleDeleteTask}
                    />
                </>
            ) : null}
        </div>
    );
}

export default App;
