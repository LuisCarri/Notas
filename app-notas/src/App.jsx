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

function App() {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputValue = formData.get("input");
    setTasks([...tasks, { id: tasks.length + 1, title: inputValue }]);
  };

  return (
    <div className="App">
      <ListOfTasks tasks={tasks} />
      <form onSubmit={handleSubmit}>
        <Input label="Ingresa una nueva tarea:" />
      </form>
    </div>
  );
}

export default App;
