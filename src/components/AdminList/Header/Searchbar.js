import React from "react";
import styles from "./Searchbar.module.css";

const Searchbar = (props) => {
  return (
    <input
      className={styles.searchbar}
      type="text"
      placeholder={props.placeholder}
    />
  );
};

export default Searchbar;
