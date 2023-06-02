import React, { useState, useEffect } from "react";
import styles from "../styles/Main.module.css";
import TodoCard from "../components/todocard";
import useQuery from "../hooks/useQuery";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { ReactComponent as Logo } from "../assets/img/Image.svg";
const Todo = () => {
  //A custom hook for quering the backend
  const {
    todos,
    isLoading,
    isAddingLoading,
    isDeletionLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useQuery();
  const notify = () => toast.error(error.message);

  const [newTask, setNewTask] = useState("");
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  useEffect(() => {
    if (error) {
      notify();
    }
  }, [error]);
  //Add new task
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setIsTaskLoading(false);
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
        <Logo />
      </div>
      <div className={styles.inputSection}>
        <input
          className={styles.inputbox}
          id="textInput"
          type="text"
          placeholder="Enter a new Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {(isAddingLoading  &&  (
          <div className={styles.toastBtn}>
            <ThreeCircles
              height="20"
              width="20"
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isAddingLoading}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />{" "}
          </div>
        )) || (
          <button id="addBtn" onClick={handleAddTask} className={styles.addBtn}>
            Add
          </button>
        )}
      </div>
      <div
        className={`${todos.length == 0 ? styles.hideTodo : styles.todoList}`}
      >
        {todos?.map((todo, index) => (
          <>
            <TodoCard
              key={index}
              todo={todo}
              isLoading={isDeletionLoading}
              onDelete={handleDeleteTask}
              onComplete={handleUpdateTask}
            />
            <hr className={styles.divider} /> {/* Adds a divider */}
          </>
        ))}
      </div>
      <ThreeCircles
        height="30"
        width="30"
        color="#9E9378"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isLoading}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />

      <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
};

export default Todo;
