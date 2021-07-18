import React, { useReducer } from "react";
import styles from "./TableRow.module.css";

const ACTION_TYPE = {
  SET_VALUE: "SET_VALUE",
  TOGGLE_SELECTED: "TOGGLE_SELECTED",
  TOGGLE_EDITABLE: "TOGGLE_EDITABLE",
};

const TableRow = (props) => {
  console.log("[TableRow] rendered");

  const { id, name, email, role } = props.data;

  const ROW_ITEM_INITIAL_STATE = {
    value: {
      name,
      email,
      role,
    },
    isEditable: false,
    isSelected: false,
  };

  const rowItemReducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPE.SET_VALUE:
        const newRowItemValues = { ...state.value, ...action.payload };
        return {
          ...state,
          value: newRowItemValues,
        };

      case ACTION_TYPE.TOGGLE_SELECTED:
        state.isSelected ? props.onUnselect(id) : props.onSelect(id);
        return {
          ...state,
          isSelected: !state.isSelected,
        };

      case ACTION_TYPE.TOGGLE_EDITABLE:
        if (state.isEditable) {
          props.onEdit(id, state.value);
        }
        return {
          ...state,
          isEditable: !state.isEditable,
        };
      default:
        return state;
    }
  };

  const [rowItem, rowItemDispatch] = useReducer(
    rowItemReducer,
    ROW_ITEM_INITIAL_STATE
  );

  let rowCssClass = styles.row;
  if (rowItem.isSelected) {
    rowCssClass += ` ${styles.selected}`;
  }

  const changeNameHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { name: event.target.value },
    });
  };

  const changeEmailHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { email: event.target.value },
    });
  };

  const changeRoleHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { role: event.target.value },
    });
  };

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
    rowItemDispatch({
      type: ACTION_TYPE.TOGGLE_SELECTED,
    });
  };

  const editRowDataHandler = () => {
    rowItemDispatch({
      type: ACTION_TYPE.TOGGLE_EDITABLE,
    });
  };

  return (
    <ul className={rowCssClass}>
      <input
        type="checkbox"
        onChange={checkBoxToggleHandler}
        checked={rowItem.isSelected}
      />
      <input
        type="text"
        value={rowItem.value.name}
        onChange={changeNameHandler}
        disabled={!rowItem.isEditable}
      />
      <input
        type="text"
        value={rowItem.value.email}
        onChange={changeEmailHandler}
        disabled={!rowItem.isEditable}
      />
      <input
        type="text"
        value={rowItem.value.role}
        onChange={changeRoleHandler}
        disabled={!rowItem.isEditable}
      />
      <div className={styles["action-group"]}>
        {props.actions &&
          props.actions.map((action) => {
            return (
              <span
                key={action.name}
                className={styles.action}
                onClick={
                  action.name === "edit"
                    ? editRowDataHandler
                    : () => actionClickHandler(action)
                }
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
