import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import AdminList from "./AdminList";
import * as constants from "../../utils/constants";
import * as utils from "../../utils/functions";
import styles from "./AdminPage.module.css";

const listReducer = (state, action) => {
  switch (action.type) {
    case constants.ACTION_TYPE.VIEW:
    case constants.ACTION_TYPE.DELETE:
      return action.payload;
    default:
      return state;
  }
};

const AdminPage = () => {
  const [dataList, dispatchList] = useReducer(listReducer, []); // displays data list fetched from server
  const [filteredDataList, setFilteredDataList] = useState([]); // displays data list based on text searched by user

  /**
   * Function to search for a name or email or role in a list of data
   * @param {String} textToSearch
   */
  const searchItemInList = (textToSearch) => {
    // filter list based on whether name or email or role matches text entered in search box
    const filteredDataList = dataList.filter(
      (listItem) =>
        utils.checkIfCaseInsensitiveSubstring(listItem.name, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.email, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.role, textToSearch)
    );
    setFilteredDataList(filteredDataList);
  };

  const deleteItemFromDataList = (dataItemId) => {
    const updatedDataList = [...dataList];
    const indexOfItemToDelete = updatedDataList.findIndex(
      (dataItem) => dataItem.id === dataItemId
    );
    updatedDataList.splice(indexOfItemToDelete, 1);
    dispatchList({
      type: constants.ACTION_TYPE.DELETE,
      payload: updatedDataList,
    });
  };

  const deleteItemFromFilteredDataList = (dataItemId) => {
    const updatedFilteredDataList = [...filteredDataList];
    const indexOfItemToDelete = updatedFilteredDataList.findIndex(
      (dataItem) => dataItem.id === dataItemId
    );
    updatedFilteredDataList.splice(indexOfItemToDelete, 1);
    setFilteredDataList(updatedFilteredDataList);
  };

  const deleteItemFromList = (datatItemId) => {
    deleteItemFromDataList(datatItemId);
    deleteItemFromFilteredDataList(datatItemId);
  };

  useEffect(() => {
    const fetchListDataFromServer = async () => {
      let jsonResponseData = null;
      try {
        const responseData = await fetch(constants.API_URL);
        jsonResponseData = await responseData.json();
      } catch (error) {
        console.log(error);
      }
      dispatchList({
        type: constants.ACTION_TYPE.VIEW,
        payload: jsonResponseData,
      });
    };

    fetchListDataFromServer();
  }, []);

  return (
    <main className={styles["admin-page"]}>
      <SearchBar
        placeholder="Search by name, email or role"
        onSearch={searchItemInList}
      />
      <AdminList
        list={filteredDataList.length > 0 ? filteredDataList : dataList}
        onDelete={deleteItemFromList}
      />
    </main>
  );
};

export default AdminPage;
