import React, { useState, useEffect } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState("");

  const changeSearchTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    // DEBOUNCING - search for text only after 300ms expire instead of searching on every key stroke
    const searchTimer = setTimeout(() => {
      props.onSearch(searchText);
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText]);

  return (
    <section className={styles.searchbar}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={changeSearchTextHandler}
      />
    </section>
  );
};

export default Searchbar;
