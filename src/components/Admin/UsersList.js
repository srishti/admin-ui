import React from "react";
import TableView from "../UI/TableView/TableView";

const UsersList = (props) => {
  console.log("[UsersList] rendered");

  // labels to be displayed inside table header
  const tableViewHeaderLabels = ["Name", "Email", "Role", "Actions"];

  return (
    <TableView
      data={props.userData}
      labels={tableViewHeaderLabels}
      itemsCount={props.usersCount}
      selectedRows={props.selectedUsersIds}
      currentPage={props.currentPage}
      onSelectSingleRow={props.onSelectSingleUser}
      onSelectAllRows={props.onSelectCurrentPageUsers}
      onUnselectSingleRow={props.onUnselectSingleUser}
      onUnselectAllRows={props.onUnselectCurrentPageUsers}
      onEdit={props.onEditUser}
      onSingleRowDelete={props.onDeleteSingleUser}
      onMultipleRowsDelete={props.onDeleteMultipleUsers}
      onSelectPage={props.onSelectPage}
    />
  );
};

export default UsersList;
