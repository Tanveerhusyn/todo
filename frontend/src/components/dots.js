import React from 'react'
import styles from "../styles/Todo.module.css";

function Dots() {
  return (
    <>
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
    </>
  )
}

export default Dots