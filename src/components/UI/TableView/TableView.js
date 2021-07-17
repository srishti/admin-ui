import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const TableView = (props) => {
  return (
    <div>
      <TableHeader>
        <TableRow data={props.labels} />
      </TableHeader>
      {props.data.map((dataItem) => {
        return <TableRow key={dataItem.id} data={dataItem} />;
      })}
    </div>
  );
};

export default TableView;
