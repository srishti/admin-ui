import React from "react";
import TableView from "../UI/TableView/TableView";
import * as icons from "../../utils/icons";

const AdminList = (props) => {
  // labels to be displayed inside table header
  const headerLabels = {
    name: "Name",
    email: "Email",
    role: "Role",
  };

  const actions = [
    {
      name: "edit",
      iconClass: `${icons.FA_ICON_PREFIX}${icons.EDIT}`,
      onClick: () => {},
    },
    {
      name: "delete",
      iconClass: `${icons.FA_ICON_PREFIX}${icons.DELETE}`,
      onClick: props.onDelete,
    },
  ];

  return (
    <TableView data={props.list} labels={headerLabels} actions={actions} />
  );
};

export default AdminList;
