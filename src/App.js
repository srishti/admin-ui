import React from "react";
import AdminPage from "./components/Admin/AdminPage";
import { AdminContextProvider } from "./context/admin-context";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <AdminContextProvider>
        <AdminPage />
      </AdminContextProvider>
    </ErrorBoundary>
  );
};

export default App;
