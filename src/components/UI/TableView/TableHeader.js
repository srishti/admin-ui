import React, { useContext } from "react";
import TableViewContext from "../../../context/UI/table-view-context";
import styles from "./TableHeader.module.css";

const TableHeader = (props) => {
  console.log("[TableHeader] rendered");

  const tableViewContext = useContext(TableViewContext);

  return (
    <thead className={styles["table-head"]}>
      <tr className={styles["table-row"]}>
        <th>
          <input
            type="checkbox"
            checked={tableViewContext.isTableHeaderChecked}
            onChange={tableViewContext.onToggleTableHeaderCheckbox}
          />
        </th>
        {props.labels.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
