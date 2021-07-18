import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

const TableView = (props) => {
  console.log("[TableView] rendered");

  const checkIfRowIsSelected = (itemId) => {
    let isItemPresentInSelectedItems = false;
    isItemPresentInSelectedItems =
      props.selectedItems.findIndex(
        (selectedItemId) => selectedItemId === itemId
      ) > -1;
    return isItemPresentInSelectedItems;
  };

  return (
    <div>
      <TableHeader>
        <TableRow data={props.labels} />
      </TableHeader>
      {props.data.map((dataItem) => {
        return (
          <TableRow
            key={dataItem.id}
            data={dataItem}
            actions={props.actions}
            selected={checkIfRowIsSelected(dataItem.id)}
            onEdit={props.onEdit}
            onSelectItem={props.onSelectItem}
            onUnselectItem={props.onUnselectItem}
          />
        );
      })}
      <TableFooter
        itemCount={props.itemCount}
        onDeleteMultipleItems={props.onDeleteMultipleItems}
        onSelectPage={props.onSelectPage}
      />
    </div>
  );
};

export default TableView;
