import React from "react";
import Button from "../Button/Button";
import styles from "./TableFooter.module.css";

const TableFooter = (props) => {
  console.log("[TableFooter] rendered");

  return (
    <footer className={styles["table-footer"]}>
      <Button
        className={styles["table-footer-button"]}
        onClick={props.onDelete}
      >
        Delete Selected
      </Button>
    </footer>
  );
};

export default TableFooter;
