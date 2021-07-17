import React from "react";
import styles from "./TableRow.module.css";

const TableRow = (props) => {
  const { id, name, email, role } = props.data;

  /**
   * Function as event handler for onClick event on action
   * @param {*} currentAction - action currently clicked by user
   */
  const actionClickHandler = (currentAction) => {
    currentAction.onClick(id); // id corresponds to the id of the data item corresponding to the action clicked
  };

  return (
    <ul className={styles.row}>
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
