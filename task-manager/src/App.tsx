import React from "react";
import "./App.css";
import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <TasksContainer />
    </div>
  );
}

export default App;
