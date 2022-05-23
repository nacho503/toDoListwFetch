import "bootstrap/dist/css/bootstrap.css";
import "./Todo.css";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

//Intento de GET, funciono... ahora intentar hacer un push al arreglo
// let GetArreglo = () => {
//   fetch("https://assets.breatheco.de/apis/fake/todos/user/ignacior", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((resp) => {
//       console.log(resp.ok); // will be true if the response is successfull
//       console.log(resp.status); // the status code = 200 or code = 400 etc.
//       console.log(resp.json()); // will try return the exact result as string
//     })
//     .catch((error) => {
//       //error handling
//       console.log(error);
//     });
// };

let Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setTask] = useState({ label: "", done: false }); //arreglar esta wea primero

  const handleChange = (e) => {
    setTask({ label: e.target.value, done: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    console.log("submit ejecutado", newTask, [...tasks]);
    setTask({ label: "", done: false });
    // GetArreglo(); //El arreglo anterior solo mostrado en la consola
    //// intento de PUT
    fetch("https://assets.breatheco.de/apis/fake/todos/user/ignacior", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        // return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        setTasks([...tasks]);
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
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
          value={newTask.label}
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
              {task.label}
              <FontAwesomeIcon
                icon={faDeleteLeft}
                className="deleteIcon"
                onClick={() => deleteTask(index)}
              />
            </span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Todo;
