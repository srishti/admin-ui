import React, { useEffect, useReducer, useState } from "react";
import Searchbar from "./components/Admin/Search/Searchbar";
import AdminList from "./components/Admin/AdminList";
import * as constants from "./utils/constants";
import * as utils from "./utils/functions";
import styles from "./App.module.css";

const listReducer = (state, action) => {
  switch (action.type) {
    case constants.ACTION_TYPE.VIEW:
      return action.payload;
    default:
      return state;
  }
};

const App = () => {
  const [listData, listDispatch] = useReducer(listReducer, []); // displays data list fetched from server
  const [filteredListData, setFilteredListData] = useState([]); // displays data list based on text searched by user

  /**
   * Function to search for a name or email or role in a list of data
   * @param {String} textToSearch
   */
  const searchList = (textToSearch) => {
    // filter list based on whether name or email or role matches text entered in search box
    const filteredList = listData.filter(
      (listItem) =>
        utils.checkIfCaseInsensitiveSubstring(listItem.name, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.email, textToSearch) ||
        utils.checkIfCaseInsensitiveSubstring(listItem.role, textToSearch)
    );
    setFilteredListData(filteredList);
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
      listDispatch({
        type: constants.ACTION_TYPE.VIEW,
        payload: jsonResponseData,
      });
    };

    fetchListDataFromServer();
  }, [listData]);

  return (
    <main className={styles.app}>
      <Searchbar
        placeholder="Search by name, email or role"
        onSearch={searchList}
      />
      <AdminList
        list={filteredListData.length > 0 ? filteredListData : listData}
      />
    </main>
  );
};

export default App;
