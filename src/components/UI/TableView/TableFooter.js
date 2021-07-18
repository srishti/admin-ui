import React from "react";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import styles from "./TableFooter.module.css";

const TableFooter = (props) => {
  console.log("[TableFooter] rendered");

  return (
    <footer className={styles["table-footer"]}>
      <Button
        className={styles["table-footer-button"]}
        onClick={props.onDeleteMultipleItems}
      >
        Delete Selected
      </Button>
      <Pagination
        itemCount={props.itemCount}
        onSelectPage={props.onSelectPage}
      />
    </footer>
  );
};

export default TableFooter;
