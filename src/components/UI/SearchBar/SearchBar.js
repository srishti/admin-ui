/* eslint-disable */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
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
    <section className={styles["search-bar"]}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={changeUserInputHandler}
      />
    </section>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
