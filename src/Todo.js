import "bootstrap/dist/css/bootstrap.css";
import "./Todo.css";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

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
    setTask("");
    // e.target.reset();  <---- no funciono para resetear el placeholder
  };

  const deleteTask = (index) => {
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
        {/* mapeo del arreglo tasks y li para los elementos */}
        {tasks.map((task, index) => (
          <li className="list-group-item" key={index}>
            <span>
              {task}
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="deleteIcon"
                onClick={() => deleteTask(index)} //CUAL ES LA DIFERENCIA DE HACERLO {() => deleteTask(index)} A   deleteTask(index)
              />
            </span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Todo;
