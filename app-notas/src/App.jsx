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

function App() {
  return (
    <div>
      <Task title="Comprar huevos" />
      <Task title="Comprar leche" />
      <Task title="Comprar pan" />
      <Task title="Comprar frutas" />
      <Task title="Comprar verduras" />
      <Task title="Comprar carne" />
    </div>
  );
}

export default App;
