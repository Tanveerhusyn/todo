import React, { useState,useEffect } from "react";
import styles from "../styles/Main.module.css";
import TodoCard from "../components/todocard";
import useQuery from "../hooks/useQuery";
import Avatar from "../components/Avatar";
import { ReactComponent as Logo }from "../assets/img/Image.svg";
const Todo = () => {

  
  //A custom hook for quering the backend
  const { todos, isLoading, error, createTodo, updateTodo, deleteTodo } =  useQuery();
 
  const [newTask, setNewTask] = useState("");


  //Add new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      createTodo({
        task: newTask,
        completed: false,
        completedTime: null,
        creationTime: new Date(),
      });
      setNewTask("");
    }
  };

  //Add new task when the enter button is pressed instead of clicking on the add button
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  //Delete a specific task
  const handleDeleteTask = (taskId) => {
    deleteTodo(taskId);
  };

  //Update a specific task
  const handleUpdateTask = (todo, event) => {
    
    const updatedData = {
      ...todo,
      completed: event,
      completedTime: event == true ? new Date() : null,
    };
    updateTodo(todo._id, updatedData);
  };

  return (
    <div className={styles.container}>
       <div className={styles.avatarSection}>
       <Logo/>
       </div>
      <div className={styles.inputSection}>
        <input
          className={styles.inputbox}
          type="text"
          placeholder="Enter a new Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddTask} className={styles.addBtn}>
          Add
        </button>
      </div>
      <div
        className={`${todos.length == 0 ? styles.hideTodo : styles.todoList}`}
      >
        {todos?.map((todo,index) => (
          <>
            <TodoCard
              key={index}
              todo={todo}
              creationTime="2023-05-26 10:00 AM"
              onDelete={handleDeleteTask}
              onComplete={handleUpdateTask}
            />
            <hr className={styles.divider} /> {/* Adds a divider */}
          </>
        ))}
      </div>
    </div>
  );
};

export default Todo;
