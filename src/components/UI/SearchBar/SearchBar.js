import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  console.log("[SearchBar] rendered");

  const [userInput, setUserInput] = useState("");

  const changeUserInputHandler = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    // DEBOUNCING - search for text only after 300ms expire instead of searching on every key stroke
    const searchTimer = setTimeout(() => {
      props.onSearch(userInput);
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [userInput]);

  return (
    <section className={styles.searchbar}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={changeUserInputHandler}
      />
    </section>
  );
};

export default SearchBar;
