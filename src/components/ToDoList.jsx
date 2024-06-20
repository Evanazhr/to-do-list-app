import { useState, useEffect } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState("");

  function handleNewTask(event) {
    setNewTasks(event.target.value);
  }

  function addTask() {
    if (newTasks.trim().length > 0) {
      setNewTasks("");
      setTasks([...tasks, newTasks]);
    }
  }

  // delete task
  function deleteTask(index) {
    const updatedTask = tasks.filter((element, i) => i !== index);
    setTasks(updatedTask);
  }

  // move up task
  function moveUpTask(index) {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [
        updatedTask[index - 1],
        updatedTask[index],
      ];
      setTasks(updatedTask);
    }
  }

  // move down task
  function moveDownTask(index) {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [
        updatedTask[index + 1],
        updatedTask[index],
      ];
      setTasks(updatedTask);
    }
  }

  //enter keydown event
  function enterKeydown(event) {
    if (event.key == "Enter") {
      addTask();
    }
  }

  useEffect(() => {
    const listItems = document.getElementsByTagName("li");
    if (listItems.length > 0) {
      document.title = `your tasks : ${listItems.length} left`;
    } else {
      document.title = `your tasks is done! `;
    }
  });


  
  return (
    <div className="container">
      <header>
        <h1 className="title">to do list app</h1>
        <p>simple to do list app</p>
        <p>built with ReactJs and vanilla CSS</p>
      </header>
      <main>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="enter your task..."
            value={newTasks}
            onKeyDown={enterKeydown}
            onChange={handleNewTask}
          />
          <button className="add-button" onClick={addTask}>
            +
          </button>
        </div>
        <div className="output">
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                <p className="text">{index+1}. {task}</p>
                <div>
                  <button
                    className="move-up-button"
                    onClick={() => moveUpTask(index)}
                  >
                    &uarr;
                  </button>
                  <button
                    className="move-down-button"
                    onClick={() => moveDownTask(index)}
                  >
                    &darr;
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(index)}
                  >
                    <i className="fa fa-trash-o"></i>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
