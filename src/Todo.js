import "bootstrap/dist/css/bootstrap.css";
import "./Todo.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

// let tasksArray = [{ task: "Ordenar" }, { task: "limpiar" }, { task: "comer" }];
//https://www.youtube.com/watch?v=U3IJ7dsDVaE

let Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    console.log("submit ejecutado", newTask, [tasks]);
    // e.target.reset();  <---- no funciono para resetear el placeholder
  };

  const deleteTask = (index) => {
    // Que Orlando me explique porque funciona esto
    let newArray = tasks;
    newArray.splice(index, 1);
    setTask([...newArray]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="list-group">
        <input
          onChange={handleChange}
          value={newTask}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Add to do"
        ></input>
        {/* maping over tasksArray */}
        {tasks.map((task, index) => (
          <li className="list-group-item" key={index}>
            <span>
              {task}
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="deleteIcon"
                onClick={() => deleteTask(index)} //que Orlando me explique porque esto funciona
              />
            </span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Todo;
