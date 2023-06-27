import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss"; // atualização da importação

// import { App } from "./App";
import { App } from "./Routes";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
