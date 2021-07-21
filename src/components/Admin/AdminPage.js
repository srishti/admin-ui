import React, { useContext } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import UsersList from "./UsersList";
import AdminContext from "../../context/admin-context";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  console.log("[AdminPage] rendered");

  const adminContext = useContext(AdminContext);

  const emptySearchResultsContent = <p>No result found.</p>;

  return (
    <main className={styles["admin-page"]}>
      <SearchBar
        placeholder="Search by name, email or role"
        value={adminContext.searchText}
        onChange={adminContext.onChangeSearchText}
        onSearch={adminContext.onSearchUser}
      />
      {adminContext.isSearchResultEmpty ? (
        emptySearchResultsContent
      ) : (
        <UsersList />
      )}
    </main>
  );
};

export default AdminPage;
