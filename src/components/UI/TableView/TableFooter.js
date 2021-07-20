import React from "react";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import styles from "./TableFooter.module.css";

const TableFooter = (props) => {
  console.log("[TableFooter] rendered");

  return (
    <div className={styles["table-footer"]}>
      <Button
        className={styles["table-footer-button"]}
        onClick={props.onDeleteMultipleRows}
      >
        Delete Selected
      </Button>
      <Pagination
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        onSelectPage={props.onSelectPage}
      />
    </div>
  );
};

export default TableFooter;
