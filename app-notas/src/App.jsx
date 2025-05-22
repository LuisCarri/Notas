import { useState } from "react";
import "./App.css";

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
    <>
      <label htmlFor="input">{label}</label>
      <input type="text" id="input" name="input" />
      <input className="bg-blue-500 text-white p-2 rounded-md" type="submit" />
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get("input");
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: inputValue, completed: false },
    ]);
  };

  const markTaskAsCompleted = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="justify-center items-center flex flex-col">
      {pendingTasks.length === 0 ? <h1>Aún no hay tareas</h1> : null}
      <ListOfTasks tasks={pendingTasks} onComplete={markTaskAsCompleted} />
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
          <ListOfTasks tasks={completedTasks} onDelete={handleDeleteTask} />
        </>
      ) : null}
    </div>
  );
}

export default App;
