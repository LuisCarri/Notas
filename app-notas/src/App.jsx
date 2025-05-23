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
/*
Para conectar el backend con el frontend, normalmente necesitas hacer peticiones HTTP (por ejemplo, usando fetch o axios) a tu API backend para obtener, crear, actualizar o eliminar tareas.

Aquí tienes un ejemplo básico usando fetch para obtener tareas desde un backend al cargar el componente App:

1. Agrega useEffect y una función para cargar tareas desde el backend.
2. Usa fetch para hacer la petición a tu API (ajusta la URL según tu backend).

Ejemplo de cómo podrías hacerlo en App.jsx:


function App() {
  // ... tus estados y funciones

  useEffect(() => {
    fetch("http://localhost:3001/tasks") // Cambia la URL a la de tu backend
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // ... resto del componente
}

Para crear, actualizar o eliminar tareas, reemplaza los métodos setTasks directos por peticiones fetch (POST, PUT, DELETE) a tu backend y actualiza el estado según la respuesta.

Recuerda:
- El backend debe tener habilitado CORS si el frontend y backend están en dominios/puertos distintos.
- Ajusta las rutas y métodos HTTP según tu API.

*/
function Input({ label }) {
    return (
        <>
            <label htmlFor="input">{label}</label>
            <input type="text" id="input" name="input" />
            <input
                className="bg-blue-500 text-white p-2 rounded-md"
                type="submit"
            />
        </>
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
                    isCompleted={task.completed}
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
                completed: false,
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
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
            )
        );
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

    const completedTasks = tasks.filter((task) => task.completed);
    const pendingTasks = tasks.filter((task) => !task.completed);

    return (
        <div className="justify-center items-center flex flex-col">
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
