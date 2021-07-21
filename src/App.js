import React from "react";
import AdminPage from "./components/Admin/AdminPage";
import { AdminContextProvider } from "./context/admin-context";

const App = () => {
  return (
    <AdminContextProvider>
      <AdminPage />
    </AdminContextProvider>
  );
};

export default App;
