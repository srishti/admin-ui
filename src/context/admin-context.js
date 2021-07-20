import React, { useState, useEffect } from "react";
import * as constants from "../utils/constants";
import * as utils from "../utils/functions";

const AdminContext = React.createContext({
  userData: [],
  selectedUsersIds: [],
  usersCount: null,
  currentPage: null,
  onSearchUser: (textToSearch) => {},
  onEditUser: (userId, newUserData) => {},
  onDeleteSingleUser: (userId) => {},
  onDeleteMultipleUsers: () => {},
  onSelectSingleUser: (userId) => {},
  onSelectCurrentPageUsers: () => {},
  onUnselectSingleUser: (userId) => {},
  onUnselectCurrentPageUsers: () => {},
  onSelectPage: (currentPageNumber) => {},
});

export const AdminContextProvider = (props) => {
  const [users, setUsers] = useState([]); // keeps track of users list fetched from server
  const [filteredUsers, setFilteredUsers] = useState([]); // keeps track of users list filtered by admin based on search criterion
  const [pageUsers, setPageUsers] = useState([]); // keeps track of users list displayed on current page
  const [selectedUserIdsList, setSelectedUserIdsList] = useState([]); // keeps track of user IDs selected by admin by checking the checkbox
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Function to display users on current page
   * @param {Number} currentPageNumber - page currently selected by admin
   */
  const displayUsersOnCurrentPage = (currentPageNumber) => {
    setCurrentPage(currentPageNumber);
    let newPageUsers = [];
    if (filteredUsers.length > 0) {
      const startIndex = 0;
      const endIndex = startIndex + constants.PAGE_LIMIT;
      newPageUsers = filteredUsers.slice(0, endIndex);
    } else if (users.length > 0) {
      const startIndex = (currentPageNumber - 1) * constants.PAGE_LIMIT;
      const endIndex = startIndex + constants.PAGE_LIMIT;
      newPageUsers = users.slice(startIndex, endIndex);
    }
    setPageUsers(newPageUsers);
  };

  /**
   * Function to search for a name or email or role in a list of users
   * @param {String} textToSearch
   */
  const searchUser = (textToSearch) => {
    if (textToSearch) {
      // filter list based on whether name or email or role matches text entered in search box
      const updatedFilteredUsers = users.filter(
        (user) =>
          utils.checkIfCaseInsensitiveSubstring(user.name, textToSearch) ||
          utils.checkIfCaseInsensitiveSubstring(user.email, textToSearch) ||
          utils.checkIfCaseInsensitiveSubstring(user.role, textToSearch)
      );
      setFilteredUsers(updatedFilteredUsers);
    } else {
      setFilteredUsers([]);
    }
  };

  /**
   * Function to edit user data in the list of users
   * @param {String} userId - ID of user to be edited
   * @param {Object} newUserData - new data for the user which needs to be merged with the existing user data
   */
  const editUser = (userId, newUserData) => {
    console.log("jey");
    setUsers(
      utils.editOrDeleteElementFromArrayById(users, userId, newUserData)
    );
    setFilteredUsers(
      utils.editOrDeleteElementFromArrayById(filteredUsers, userId, newUserData)
    );
  };

  /**
   * Function to delete single user from the list of users
   * @param {String} userId - ID of user to be deleted
   */
  const deleteSingleUser = (userId) => {
    setUsers(utils.editOrDeleteElementFromArrayById(users, userId));
    setFilteredUsers(
      utils.editOrDeleteElementFromArrayById(filteredUsers, userId)
    );
  };

  /**
   * Function to delete multiple selected users from the list of users
   */
  const deleteMultipleUsers = () => {
    let updatedUsers = [...users];
    let updatedFilteredUsers = [...filteredUsers];
    for (let userId of selectedUserIdsList) {
      updatedUsers = utils.editOrDeleteElementFromArrayById(
        updatedUsers,
        userId
      );
      updatedFilteredUsers = utils.editOrDeleteElementFromArrayById(
        updatedFilteredUsers,
        userId
      );
    }
    setUsers(updatedUsers);
    setFilteredUsers(updatedFilteredUsers);
  };

  /**
   * Function to select (or check) a user from the list of users
   * @param {String} userId - ID of user to be selected
   */
  const selectSingleUser = (userId) => {
    const updatedUserIdsList = [...selectedUserIdsList];
    updatedUserIdsList.push(userId);
    setSelectedUserIdsList(updatedUserIdsList);
  };

  /**
   * Function to select (or check) all users displayed on the current page
   */
  const selectAllCurrentPageUsers = () => {
    const updatedUserIdsList = [...selectedUserIdsList];
    for (let user of pageUsers) {
      updatedUserIdsList.push(user.id);
    }
    setSelectedUserIdsList(updatedUserIdsList);
  };

  /**
   * Function to unselect (or uncheck) a user from the list of users
   * @param {String} userId - ID of user to be unselected
   */
  const unselectSingleUser = (userId) => {
    setSelectedUserIdsList(
      utils.editOrDeleteElementFromArray(selectedUserIdsList, userId)
    );
  };

  /**
   * Function to unselect (or uncheck) all users displayed on the current page
   */
  const unselectAllCurrentPageUsers = () => {
    let updatedUserIdsList = [...selectedUserIdsList];
    for (let user of pageUsers) {
      updatedUserIdsList = utils.editOrDeleteElementFromArray(
        updatedUserIdsList,
        user.id
      );
    }
    setSelectedUserIdsList(updatedUserIdsList);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let jsonResponse = null;
      try {
        const response = await fetch(constants.API_URL);
        jsonResponse = await response.json();
      } catch (error) {
        console.error(error);
      }
      setUsers(jsonResponse);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    displayUsersOnCurrentPage(currentPage);
  }, [users, filteredUsers]);

  const adminContextProviderValues = {
    userData: pageUsers,
    selectedUsersIds: selectedUserIdsList,
    usersCount: filteredUsers.length > 0 ? filteredUsers.length : users.length,
    currentPage: currentPage,
    onSearchUser: searchUser,
    onEditUser: editUser,
    onDeleteSingleUser: deleteSingleUser,
    onDeleteMultipleUsers: deleteMultipleUsers,
    onSelectSingleUser: selectSingleUser,
    onSelectCurrentPageUsers: selectAllCurrentPageUsers,
    onUnselectSingleUser: unselectSingleUser,
    onUnselectCurrentPageUsers: unselectAllCurrentPageUsers,
    onSelectPage: displayUsersOnCurrentPage,
  };

  return (
    <AdminContext.Provider {...props} value={adminContextProviderValues}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;