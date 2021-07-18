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
    case constants.ACTION_TYPE.EDIT:
      return action.payload;
    default:
      return state;
  }
};

const AdminPage = () => {
  console.log("[AdminPage] rendered");

  const [dataList, dispatchList] = useReducer(listReducer, []); // keep track of data list fetched from server
  const [filteredDataList, setFilteredDataList] = useState([]); // keep track of data list based on text searched by user
  const [pageDataList, setPageDataList] = useState([]); // keep track of data list to be displayed on current page
  const [selectedItems, setSelectedItems] = useState([]); // keeps track of IDs of items selected by user by checking the checkbox

  /**
   * Function to display data on current page
   * @param {Number} currentPageNumber - page currently selected by user
   */
  const displayCurrentPageData = (currentPageNumber) => {
    const startIndex = (currentPageNumber - 1) * constants.PAGE_LIMIT;
    const endIndex = startIndex + constants.PAGE_LIMIT;
    let newPageDataList = [];
    if (filteredDataList.length > 0) {
      newPageDataList = filteredDataList.slice(startIndex, endIndex);
    } else if (dataList.length > 0) {
      newPageDataList = dataList.slice(startIndex, endIndex);
    }
    setPageDataList(newPageDataList);
  };

  /**
   * Function to search for a name or email or role in a list of data
   * @param {String} textToSearch
   */
  const searchItem = (textToSearch) => {
    if (textToSearch) {
      // filter list based on whether name or email or role matches text entered in search box
      const filteredDataList = dataList.filter(
        (listItem) =>
          utils.checkIfCaseInsensitiveSubstring(listItem.name, textToSearch) ||
          utils.checkIfCaseInsensitiveSubstring(listItem.email, textToSearch) ||
          utils.checkIfCaseInsensitiveSubstring(listItem.role, textToSearch)
      );
      setFilteredDataList(filteredDataList);
    } else {
      setFilteredDataList([]);
    }
  };

  /**
   * Function to edit an item in the displayed list of items
   * @param {String} itemId - ID of item to be edited
   * @param {Object} newItemData - edited data for the item
   */
  const editItem = (itemId, newItemData) => {
    const updatedDataList = [...dataList];
    if (updatedDataList.length <= 0) {
      return;
    }
    const indexOfItemToEdit = utils.getElementIndexById(
      updatedDataList,
      itemId
    );
    if (indexOfItemToEdit > -1) {
      const existingItemData = updatedDataList[indexOfItemToEdit];
      updatedDataList[indexOfItemToEdit] = {
        ...existingItemData,
        ...newItemData,
      };
    }
    dispatchList({
      type: constants.ACTION_TYPE.EDIT,
      payload: updatedDataList,
    });
  };

  /**
   * Function to delete single item from the dataList (list fetched from server) in state
   * @param {String} itemId - ID of item to be deleted
   */
  const deleteSingleItem = (itemId) => {
    const updatedDataList = [...dataList];
    if (updatedDataList.length <= 0) {
      return;
    }
    const indexOfItemToDelete = utils.getElementIndexById(
      updatedDataList,
      itemId
    );
    if (indexOfItemToDelete > -1) {
      updatedDataList.splice(indexOfItemToDelete, 1);
    }
    dispatchList({
      type: constants.ACTION_TYPE.DELETE_SINGLE,
      payload: updatedDataList,
    });
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
    if (updatedItemsSelected.length <= 0) {
      return;
    }
    const unselectedItemIndexInDataList = pageDataList.findIndex(
      (dataItem) => dataItem === itemId
    );
    updatedItemsSelected.splice(unselectedItemIndexInDataList, 1);
    setSelectedItems(updatedItemsSelected);
  };

  /**
   * Function to delete selected items from the list displayed
   */
  const deleteSelectedItems = () => {
    const updatedDataList = [...dataList];
    if (updatedDataList.length <= 0) {
      return;
    }
    for (let itemId of selectedItems) {
      const indexOfSelectedItemInDataList = utils.getElementIndexById(
        updatedDataList,
        itemId
      );
      if (indexOfSelectedItemInDataList > -1) {
        updatedDataList.splice(indexOfSelectedItemInDataList, 1);
      }
    }
    dispatchList({
      type: constants.ACTION_TYPE.DELETE_MULTIPLE,
      payload: updatedDataList,
    });
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

  useEffect(() => {
    displayCurrentPageData(1);
  }, [dataList, filteredDataList]);

  return (
    <main className={styles["admin-page"]}>
      <SearchBar
        placeholder="Search by name, email or role"
        onSearch={searchItem}
      />
      <AdminList
        list={pageDataList}
        selectedItems={selectedItems}
        itemCount={
          filteredDataList.length > 0
            ? filteredDataList.length
            : dataList.length
        }
        onEdit={editItem}
        onDeleteSingleItem={deleteSingleItem}
        onDeleteMultipleItems={deleteSelectedItems}
        onSelectItem={selectItem}
        onUnselectItem={unselectItem}
        onSelectPage={displayCurrentPageData}
      />
    </main>
  );
};

export default AdminPage;
