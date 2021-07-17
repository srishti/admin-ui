import React from "react";
import styles from "./TableRow.module.css";

const TableRow = (props) => {
  const { name, email, role } = props.data;

  return (
    <ul className={styles.row}>
      <li>{name}</li>
      <li>{email}</li>
      <li>{role}</li>
    </ul>
  );
};

export default TableRow;
