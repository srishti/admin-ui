import React, { useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  console.log("[SearchBar] rendered");

  const changeUserInputHandler = (event) => {
    props.onChange(event.target.value);
  };

  const { value } = props;

  useEffect(() => {
    // DEBOUNCING - search for text only after 300ms expire instead of searching on every key stroke
    const searchTimer = setTimeout(() => {
      props.onSearch();
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [value]);

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
