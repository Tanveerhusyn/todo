import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import styles from "../styles/Todo.module.css";
import Dots from "./dots";
import moment from "moment";
import {  ThreeCircles } from "react-loader-spinner";
const TodoCard = ({ todo, onDelete, onComplete,isLoading }) => {
  const { task, _id: taskId, completed, completedTime, creationTime } = todo;

  const [isChecked, setIsChecked] = useState(completed);
  const [isDeleting, setIsDeleting] = useState(false);
 

  const handleCheckboxChange = (event) => {
    onComplete(todo, event.target.checked);
    setIsChecked(event.target.checked);
  };

  const handleDelete = (taskid) => {
 
      onDelete(taskId);
      setIsDeleting(false);
       
     
  };

  const handleDotClick = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const formatDateTime = (dateTime) => {
    const formattedTime = moment(creationTime).format("DD-MM-YY HH:mm");

    return formattedTime;
  };

  return (
    <div className={`${styles.todo} ${isDeleting ? styles.deleting : ""}`}>
      <div className={styles.mainContainer}>
        <label className={styles.checkboxContainer}>
          <input
            id="checkbox"
            type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={styles.checkmark}>{isChecked && <HiCheck />}</span>
        </label>
        <div className={styles.content}>
          <div className={styles.task}>{task}</div>
          <div className={styles.time}>
            <span className={styles.creationTime}>
              Created: {formatDateTime(creationTime)}
            </span>
            {completedTime && (
              <span className={styles.completedTime}>
                Completed: {formatDateTime(completedTime)}
              </span>
            )}
          </div>
        </div>
      </div>
      {isDeleting && !completed && <div className={styles.sudoDiv}></div>}
      <div id="dotBtn" className={styles.dots} onClick={handleDotClick}>
        <Dots />
      </div>

      {!isLoading && isDeleting && (
        <button
          id="delete-button"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
      {!isLoading && isDeleting && (
        <button
          id="cancel-button"
          className={styles.cancelDeleteButton}
          onClick={() => handleCancelDelete()}
        >
          Cancel
        </button>
      )}

      {isLoading && isDeleting &&(
        <ThreeCircles
          height="25"
          width="25"
          color="#9E9378"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}
    </div>
  );
};

export default TodoCard;
