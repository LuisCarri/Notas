import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="bg-black/90 h-screen flex justify-center items-center text-white">
            <App />
        </div>
    </StrictMode>
);
