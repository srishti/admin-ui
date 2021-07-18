import React from "react";
import styles from "./TableHeader.module.css";

const TableHeader = (props) => {
  console.log("[TableHeader] rendered");

  return <header className={styles["table-header"]}>{props.children}</header>;
};

export default TableHeader;
