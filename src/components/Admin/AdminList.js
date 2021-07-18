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
      onClick: props.onDeleteSingleItem,
    },
  ];

  return (
    <TableView
      data={props.list}
      labels={headerLabels}
      itemCount={props.itemCount}
      actions={actions}
      selectedItems={props.selectedItems}
      onEdit={props.onEdit}
      onSelectItem={props.onSelectItem}
      onUnselectItem={props.onUnselectItem}
      onDeleteMultipleItems={props.onDeleteMultipleItems}
      onSelectPage={props.onSelectPage}
    />
  );
};

export default AdminList;
