import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";
import styles from "../styles/Todo.module.css";

const TodoCard = ({
  task,
  completed,
  completedTime,
  creationTime,
  onDelete,
}) => {
  const [isChecked, setIsChecked] = useState(completed);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleDotClick = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className={`${styles.todo} ${isDeleting ? styles.deleting : ""}`}>
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className={styles.checkmark}>{isChecked && <HiCheck />}</span>
      </label>
      <div className={styles.task}>{task}</div>
      <div className={styles.dots} onClick={handleDotClick}>
            <span>
            <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
            </span>
            <span>
            <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
            </span>
      </div>
      {isDeleting && (
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      )}
      {isDeleting && (
        <button className={styles.cancelDeleteButton} onClick={handleCancelDelete}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default TodoCard;
