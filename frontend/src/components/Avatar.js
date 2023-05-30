import React from "react";
import styles from "../styles/Main.module.css";

const Avatar = ({ imageUrl, altText }) => {
  return (
    <div className={styles.avatar}>
      <img src={imageUrl} alt={altText} className={styles.image} />
    </div>
  );
};

export default Avatar;