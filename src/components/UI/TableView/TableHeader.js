import React, { useContext } from "react";
import TableViewContext from "../../../context/UI/table-view-context";
import styles from "./TableHeader.module.css";

const TableHeader = (props) => {
  console.log("[TableHeader] rendered");

  const tableViewContext = useContext(TableViewContext);

  return (
    <thead>
      <tr className={styles["table-row"]}>
        <th>
          <input
            type="checkbox"
            checked={tableViewContext.isTableHeaderChecked}
            onChange={tableViewContext.onToggleTableHeaderCheckbox}
          />
        </th>
        <th className={styles["custom-label-group"]}>
          {props.labels.map((label) => (
            <div key={label}>{label}</div>
          ))}
        </th>
        <th className={styles["actions-label"]}>
          <div>Actions</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
