import React from "react";
import TableView from "../UI/TableView/TableView";

const UsersList = (props) => {
  console.log("[UsersList] rendered");

  // labels to be displayed inside table header
  const tableViewHeaderLabels = {
    name: "Name",
    email: "Email",
    role: "Role",
  };

  return (
    <TableView
      data={props.userData}
      labels={tableViewHeaderLabels}
      itemsCount={props.usersCount}
      selectedRows={props.selectedUsersIds}
      currentPage={props.currentPage}
      onSelectRow={props.onSelectUser}
      onSelectAllRows={props.onSelectCurrentPageUsers}
      onUnselectRow={props.onUnselectUser}
      onEdit={props.onEditUser}
      onSingleRowDelete={props.onDeleteSingleUser}
      onMultipleRowsDelete={props.onDeleteMultipleUsers}
      onSelectPage={props.onSelectPage}
    />
  );
};

export default UsersList;
