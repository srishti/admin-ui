import React, { useContext } from "react";
import TableView from "../UI/TableView/TableView";
import AdminContext from "../../context/admin-context";

const UsersList = () => {
  console.log("[UsersList] rendered");

  const adminContext = useContext(AdminContext);

  // labels to be displayed inside table header
  const tableViewHeaderLabels = ["Name", "Email", "Role", "Actions"];

  return (
    <TableView
      data={adminContext.userData}
      labels={tableViewHeaderLabels}
      itemsCount={adminContext.usersCount}
      selectedRows={adminContext.selectedUsersIds}
      currentPage={adminContext.currentPage}
      onEdit={adminContext.onEditUser}
      onDeleteSingleRow={adminContext.onDeleteSingleUser}
      onDeleteMultipleRows={adminContext.onDeleteMultipleUsers}
      onSelectSingleRow={adminContext.onSelectSingleUser}
      onSelectAllRows={adminContext.onSelectCurrentPageUsers}
      onUnselectSingleRow={adminContext.onUnselectSingleUser}
      onUnselectAllRows={adminContext.onUnselectCurrentPageUsers}
      onSelectPage={adminContext.onSelectPage}
    />
  );
};

export default UsersList;
