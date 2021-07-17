import React, { useState } from "react";
import styles from "./TableRow.module.css";

const TableRow = (props) => {
  const [isSelected, setIsSelected] = useState(props.selected); // keeps track of whether row is selected by checking the checkbox

  const { id, name, email, role } = props.data;

  let rowCssClass = styles.row;
  if (isSelected) {
    rowCssClass += ` ${styles.selected}`;
  }

  /**
   * Function as event handler for onClick event on action
   * @param {*} currentAction - action currently clicked by user
   */
  const actionClickHandler = (currentAction) => {
    currentAction.onClick(id); // id corresponds to the id of the data item corresponding to the action clicked
  };

  /**
   * Function as event handler for onChange event on checkbox
   */
  const checkBoxToggleHandler = () => {
    setIsSelected((prevState) => {
      // select row if checkbox was previously not selected but now it is toggled (or say selected) and vice-versa
      prevState ? props.onUnselect(id) : props.onSelect(id);
      return !prevState;
    });
  };

  return (
    <ul className={rowCssClass}>
      <input
        type="checkbox"
        onChange={checkBoxToggleHandler}
        checked={isSelected}
      />
      <li>{name}</li>
      <li>{email}</li>
      <li>{role}</li>
      <div className={styles["action-group"]}>
        {props.actions &&
          props.actions.map((action) => {
            return (
              <span
                key={action.name}
                className={styles.action}
                onClick={() => actionClickHandler(action)}
              >
                <i className={action.iconClass}></i>
              </span>
            );
          })}
      </div>
    </ul>
  );
};

export default TableRow;
