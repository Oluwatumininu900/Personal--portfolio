import React, { useState } from "react";
import "./ToDoList.css"; // ✅ linked CSS file

const TodoList = () => {
  const [tasks, setTasks] = useState(["Pray", "Eat", "Code"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="todo-container">
      <div className="todo-box">
        <h1 className="todo-title">Daily To-Do List</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
            className="todo-input"
          />
          <button onClick={addTask} className="add-btn">
            Add
          </button>
        </div>

        <ol className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span className="task-text">{task}</span>
              <div className="task-actions">
                <button
                  className={`action-btn up-btn ${
                    index === 0 ? "disabled" : ""
                  }`}
                  onClick={() => moveTaskUp(index)}
                  disabled={index === 0}
                >
                  ▲
                </button>
                <button
                  className={`action-btn down-btn ${
                    index === tasks.length - 1 ? "disabled" : ""
                  }`}
                  onClick={() => moveTaskDown(index)}
                  disabled={index === tasks.length - 1}
                >
                  ▼
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
