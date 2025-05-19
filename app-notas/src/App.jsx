import { useState } from "react";
import "./App.css";

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Task({ title }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const handleMarkAsCompleted = () => {
    if (!isCompleted) {
      setIsCompleted(true);
    }
  };
  return (
    <Card>
      {isCompleted ? (
        <s>{title}</s>
      ) : (
        <>
          {title}
          <Button onClick={handleMarkAsCompleted}>
            <p>Marcar tarea como completada</p>
          </Button>
        </>
      )}
    </Card>
  );
}

function ListOfTasks({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} />
      ))}
    </div>
  );
}

function handleAddTask() {
  console.log("Agregar tarea");
}

function App() {
  let tasks = [
    { id: 1, title: "Comprar huevos" },
    { id: 2, title: "Comprar leche" },
    { id: 3, title: "Comprar pan" },
    { id: 4, title: "Comprar frutas" },
    { id: 5, title: "Comprar verduras" },
    { id: 6, title: "Comprar carne" },
  ];

  return (
    <div className="App">
      <ListOfTasks tasks={tasks} />
      <Button onClick={handleAddTask}>
        <p>Agregar tarea</p>
      </Button>
    </div>
  );
}

export default App;
