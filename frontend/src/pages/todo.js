import React from 'react';
 
import styles from '../styles/App.module.css';
import TodoCard from '../components/todocard';

const Todo = () => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <div className={styles.todoList}>
        <TodoCard
          task="Complete assignment"
          completed={false}
          completedTime={null}
          creationTime="2023-05-26 10:00 AM"
          onDelete={() => {
            // Delete logic
          }}
        />
       <hr className={styles.divider} /> {/* Add divider */}

        <TodoCard
          task="Complete assignment"
          completed={false}
          completedTime={null}
          creationTime="2023-05-26 10:00 AM"
          onDelete={() => {
            // Delete logic
          }}
        />
        {/* Add more Todo components here */}
      </div>
    </div>
  );
};

export default Todo;
