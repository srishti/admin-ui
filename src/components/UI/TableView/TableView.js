import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";
import * as utils from "../../../utils/functions";

const TableView = (props) => {
  console.log("[TableView] rendered");

  /**
   * Function to check if given row is selected
   * @param {String} itemId - ID of item contained inside the row
   * @return {Boolean} `true` if the given row is selected; `false` otherwise
   */
  const checkIfRowIsSelected = (itemId) => {
    return utils.getElementIndexById(props.selectedRows, itemId) > -1;
  };

  return (
    <div>
      <TableHeader>
        <TableRow data={props.labels} hideActions={true} />
      </TableHeader>
      {props.data.map((dataItem) => {
        return (
          <TableRow
            key={dataItem.id}
            data={dataItem}
            selected={checkIfRowIsSelected(dataItem.id)}
            onEdit={props.onEdit}
            onSingleRowDelete={props.onDeleteSingleUser}
            onSelect={props.onSelectRow}
            onUnselect={props.onUnselectRow}
          />
        );
      })}
      <TableFooter
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        onMultipleRowsDelete={props.onMultipleRowsDelete}
        onSelectPage={props.onSelectPage}
      />
    </div>
  );
};

export default TableView;
