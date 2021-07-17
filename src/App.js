import React, { useEffect, useReducer } from "react";
import Searchbar from "./components/Admin/Header/Searchbar";
import AdminList from "./components/Admin/AdminList";
import * as constants from "./utils/constants";
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
      <Searchbar placeholder="Search by name, email or role" />
      <AdminList list={listData} />
    </main>
  );
};

export default App;
