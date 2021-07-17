import React from "react";
import Searchbar from "./components/AdminList/Header/Searchbar";
import styles from "./App.module.css";

const App = () => {
  return (
    <main className={styles.app}>
      <Searchbar placeholder="Search by name, email or role" />
    </main>
  );
};

export default App;
