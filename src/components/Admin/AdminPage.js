import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import AdminList from "./AdminList";
import * as constants from "../../utils/constants";
import * as utils from "../../utils/functions";
import styles from "./AdminPage.module.css";

const listReducer = (state, action) => {
  switch (action.type) {
    case constants.ACTION_TYPE.VIEW:
    case constants.ACTION_TYPE.DELETE_SINGLE:
    case constants.ACTION_TYPE.DELETE_MULTIPLE:
      return action.payload;
    default:
      return state;
  }
};

const AdminPage = () => {
  const [dataList, dispatchList] = useReducer(listReducer, []); // keep track of data list fetched from server
  const [filteredDataList, setFilteredDataList] = useState([]); // keep track of data list based on text searched by user
  const [selectedItems, setSelectedItems] = useState([]); // keeps track of IDs of items selected by user by checking the checkbox

  /**
   * Function to search for a name or email or role in a list of data
   * @param {String} textToSearch
   */
  const searchItem = (textToSearch) => {
    // filter list based on whether name or email or role matches text entered in search box
    const filteredDataList = dataList.filter(
      (listItem) =>
        utils.checkIfCaseInsensitiveSubstring(listItem.name, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.email, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.role, textToSearch)
    );
    setFilteredDataList(filteredDataList);
  };

  /**
   * Function to delete an item from the dataList (list fetched from server) in state
   * @param {String} itemId - ID of item to be deleted
   */
  const deleteItemFromDataList = (itemId) => {
    const updatedDataList = [...dataList];
    const indexOfItemToDelete = updatedDataList.findIndex(
      (dataItem) => dataItem.id === itemId
    );
    updatedDataList.splice(indexOfItemToDelete, 1);
    dispatchList({
      type: constants.ACTION_TYPE.DELETE_SINGLE,
      payload: updatedDataList,
    });
  };

  /**
   * Function to delete an item from the filteredDataList (list filtered based on search text) in state
   * @param {String} itemId - ID of item to be deleted
   */
  const deleteItemFromFilteredDataList = (itemId) => {
    const updatedFilteredDataList = [...filteredDataList];
    const indexOfItemToDelete = updatedFilteredDataList.findIndex(
      (dataItem) => dataItem.id === itemId
    );
    updatedFilteredDataList.splice(indexOfItemToDelete, 1);
    setFilteredDataList(updatedFilteredDataList);
  };

  /**
   * Function to delete an item from the displayed list of items
   * @param {String} itemId - ID of item to be deleted
   */
  const deleteSingleItem = (itemId) => {
    deleteItemFromDataList(itemId);
    deleteItemFromFilteredDataList(itemId);
  };

  /**
   * Function to select (or check) an item from the list displayed
   * @param {String} itemId - ID of item to be selected
   */
  const selectItem = (itemId) => {
    const updatedItemsSelected = [...selectedItems];
    updatedItemsSelected.push(itemId);
    setSelectedItems(updatedItemsSelected);
  };

  /**
   * Function to unselect (or uncheck) an item from the list displayed
   * @param {String} itemId - ID of item to be unselected
   */
  const unselectItem = (itemId) => {
    const updatedItemsSelected = [...selectedItems];
    const unselectedItemIndexInDataList = dataList.findIndex(
      (dataItem) => dataItem === itemId
    );
    updatedItemsSelected.splice(unselectedItemIndexInDataList, 1);
    setSelectedItems(updatedItemsSelected);
  };

  /**
   * Function to delete selected items from dataList (list fetched from server) in state
   */
  const deleteSelectedItemsFromDataList = () => {
    const updatedDataList = [...dataList];
    for (let itemId of selectedItems) {
      const indexOfSelectedItemInDataList = updatedDataList.findIndex(
        (dataItem) => dataItem.id === itemId
      );
      updatedDataList.splice(indexOfSelectedItemInDataList, 1);
    }
    dispatchList({
      type: constants.ACTION_TYPE.DELETE_MULTIPLE,
      payload: updatedDataList,
    });
  };

  /**
   * Function to delete selected items from filteredDataList (list filtered based on search text) in state
   */
  const deleteSelectedItemsFromFilteredDataList = () => {
    const updatedFilteredDataList = [...filteredDataList];
    for (let itemId of selectedItems) {
      const indexOfSelectedItemInDataList = updatedFilteredDataList.findIndex(
        (dataItem) => dataItem.id === itemId
      );
      updatedFilteredDataList.splice(indexOfSelectedItemInDataList, 1);
    }
    setFilteredDataList(updatedFilteredDataList);
  };

  /**
   * Function to delete selected items from the list displayed
   */
  const deleteSelectedItems = () => {
    deleteSelectedItemsFromDataList();
    deleteSelectedItemsFromFilteredDataList();
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
        onSearch={searchItem}
      />
      <AdminList
        list={filteredDataList.length > 0 ? filteredDataList : dataList}
        selectedItems={selectedItems}
        onSingleDelete={deleteSingleItem}
        onSelect={selectItem}
        onUnselect={unselectItem}
        onMultipleDelete={deleteSelectedItems}
      />
    </main>
  );
};

export default AdminPage;
