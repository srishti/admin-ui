import React from "react";
import TableView from "../UI/TableView/TableView";

const AdminList = (props) => {
  // labels to be displayed inside table header
  const headerLabels = {
    name: "Name",
    email: "Email",
    role: "Role",
  };
  return <TableView data={props.list} labels={headerLabels} />;
};

export default AdminList;
