import React, { useState } from "react";
import styles from "./TableHeader.module.css";

const TableHeader = (props) => {
  console.log("[TableHeader] rendered");

  const [isChecked, setIsChecked] = useState(false);

  const checkBoxToggleHandler = () => {
    setIsChecked((prevState) => {
      const toggledState = !prevState;
      toggledState ? props.onSelectAllRows() : props.onUnselectAllRows();
      return toggledState;
    });
  };

  return (
    <thead className={styles["table-head"]}>
      <tr className={styles["table-row"]}>
        <th>
          <input
            type="checkbox"
            onChange={checkBoxToggleHandler}
            checked={isChecked}
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
