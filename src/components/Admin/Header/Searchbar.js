import React from "react";
import styles from "./Searchbar.module.css";

const Searchbar = (props) => {
  return (
    <section className={styles.searchbar}>
      <input type="text" placeholder={props.placeholder} />
    </section>
  );
};

export default Searchbar;
