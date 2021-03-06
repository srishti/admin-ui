import React, { useReducer } from "react";
import * as icons from "../../../utils/icons";
import PropTypes from "prop-types";
import styles from "./TableRow.module.css";

const ACTION_TYPE = {
  SET_VALUE: "SET_VALUE",
  TOGGLE_EDITABLE: "TOGGLE_EDITABLE",
};

const TableRow = (props) => {
  const { id, name, email, role } = props.data;

  const ROW_DATA_INITIAL_STATE = {
    value: {
      name,
      email,
      role,
    },
    isEditable: false,
  };

  /**
   * Reducer function to be invoked when corresponding dispatch function is invoked
   * @param {Object} state - latest corresponding state
   * @param {Object} action - action dispatched with corresponding dispatch function
   * @return {Object} updated state
   */
  const rowDataReducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPE.SET_VALUE:
        const newRowDataValues = { ...state.value, ...action.payload };
        return {
          ...state,
          value: newRowDataValues,
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

  const [rowData, rowDataDispatch] = useReducer(
    rowDataReducer,
    ROW_DATA_INITIAL_STATE
  );

  let rowCssClass = styles["table-row"];
  if (props.selected) {
    rowCssClass += ` ${styles["selected"]}`;
  }

  /**
   * Function as event handler for onChange event on name input field
   * @param {Object} event - event fired
   */
  const changeNameHandler = (event) => {
    rowDataDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { name: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on email input field
   * @param {Object} event - event fired
   */
  const changeEmailHandler = (event) => {
    rowDataDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { email: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on role input field
   * @param {Object} event - event fired
   */
  const changeRoleHandler = (event) => {
    rowDataDispatch({
      type: ACTION_TYPE.SET_VALUE,
      payload: { role: event.target.value },
    });
  };

  /**
   * Function as event handler for onChange event on checkbox
   */
  const checkBoxToggleHandler = () => {
    props.selected ? props.onUnselect(id) : props.onSelect(id);
  };

  /**
   * Function as event handler for onClick event on Edit icon
   */
  const editRowDataHandler = () => {
    rowDataDispatch({
      type: ACTION_TYPE.TOGGLE_EDITABLE,
    });
  };

  /**
   * Function as event handler for onClick event on Delete icon
   */
  const deleteRowHandler = () => {
    props.onDeleteSingleRow(id);
  };

  return (
    <tr className={rowCssClass}>
      <td>
        <input
          type="checkbox"
          onChange={checkBoxToggleHandler}
          checked={props.selected}
        />
      </td>
      <td className={styles["custom-data-group"]}>
        <input
          type="text"
          value={rowData.value.name}
          onChange={changeNameHandler}
          disabled={!rowData.isEditable}
        />
        <input
          type="text"
          value={rowData.value.email}
          onChange={changeEmailHandler}
          disabled={!rowData.isEditable}
        />
        <input
          type="text"
          value={rowData.value.role}
          onChange={changeRoleHandler}
          disabled={!rowData.isEditable}
        />
      </td>
      <td className={styles["actions-group"]}>
        <div className={styles["action"]} onClick={editRowDataHandler}>
          <i
            className={`${icons.FA_ICON_PREFIX}${
              rowData.isEditable ? icons.SAVE : icons.EDIT
            }`}
          ></i>
        </div>
        <div className={styles["action"]} onClick={deleteRowHandler}>
          <i className={`${icons.FA_ICON_PREFIX}${icons.DELETE}`}></i>
        </div>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUnselect: PropTypes.func.isRequired,
  onDeleteSingleRow: PropTypes.func.isRequired,
};

export default TableRow;
