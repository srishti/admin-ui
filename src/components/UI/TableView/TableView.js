import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import { TableViewContextProvier } from "../../../context/UI/table-view-context";
import styles from "./TableView.module.css";

const TableView = (props) => {
  console.log("[TableView] rendered");

  /**
   * Function to check if given row is selected
   * @param {String} itemId - ID of item contained inside the row
   * @return {Boolean} `true` if the given row is selected; `false` otherwise
   */
  const checkIfRowIsSelected = (itemId) => {
    return props.selectedRows.findIndex((element) => element === itemId) > -1;
  };

  return (
    <TableViewContextProvier
      onSelectAllRows={props.onSelectAllRows}
      onUnselectAllRows={props.onUnselectAllRows}
    >
      <table className={styles.table}>
        <TableHeader labels={props.labels} />
        <tbody>
          {props.data.map((dataItem) => {
            return (
              <TableRow
                key={dataItem.id}
                data={dataItem}
                selected={checkIfRowIsSelected(dataItem.id)}
                onEdit={props.onEdit}
                onDeleteSingleRow={props.onDeleteSingleRow}
                onSelect={props.onSelectSingleRow}
                onUnselect={props.onUnselectSingleRow}
              />
            );
          })}
        </tbody>
      </table>
      <TableFooter
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        onDeleteMultipleRows={props.onDeleteMultipleRows}
        onSelectPage={props.onSelectPage}
      />
    </TableViewContextProvier>
  );
};

export default TableView;
