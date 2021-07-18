import React, { useReducer } from "react";
import * as icons from "../../../utils/icons";
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

  /**
   * Reducer function to be invoked when corresponding dispatch function is invoked
   * @param {Object} state - latest corresponding state
   * @param {Object} action - action dispatched with corresponding dispatch function
   * @return {Object} updated state
   */
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

  let actionGroupCssClass = styles["action-group"];
  if (props.hideActions) {
    actionGroupCssClass += ` ${styles.hide}`;
  }

  /**
   * Function as event handler for onChange event on name input field
   * @param {Object} event - event fired
   */
  const changeNameHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { name: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on email input field
   * @param {Object} event - event fired
   */
  const changeEmailHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { email: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on role input field
   * @param {Object} event - event fired
   */
  const changeRoleHandler = (event) => {
    rowItemDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { role: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on checkbox
   */
  const checkBoxToggleHandler = () => {
    rowItemDispatch({
      type: ACTION_TYPE.TOGGLE_SELECTED,
    });
  };

  /**
   * Function as event handler for onClick event on Edit icon
   */
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
      <div className={actionGroupCssClass}>
        <span className={styles.action} onClick={editRowDataHandler}>
          <i
            className={`${icons.FA_ICON_PREFIX}${
              rowItem.isEditable ? icons.SAVE : icons.EDIT
            }`}
          ></i>
        </span>
        <span className={styles.action} onClick={props.onSingleRowDelete}>
          <i className={`${icons.FA_ICON_PREFIX}${icons.DELETE}`}></i>
        </span>
      </div>
    </ul>
  );
};

export default TableRow;
