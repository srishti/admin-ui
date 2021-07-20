import React, { useState } from "react";

const TableViewContext = React.createContext({
  isTableHeaderChecked: false,
  onToggleTableHeaderCheckbox: () => {},
  onUncheckTableHeaderCheckbox: () => {},
});

export const TableViewContextProvier = (props) => {
  const [isTableHeaderChecked, setIsTableHeaderChecked] = useState(false);

  /**
   * Function as event listener for onClick event on checkbox present in TableHeader
   */
  const tableHeadercheckBoxToggleHandler = () => {
    setIsTableHeaderChecked((prevState) => {
      const toggledState = !prevState;
      toggledState ? props.onSelectAllRows() : props.onUnselectAllRows();
      return toggledState;
    });
  };

  /**
   * Funtion to uncheck the TableHeader checkbox
   */
  const uncheckTableHeaderCheckbox = () => {
    setIsTableHeaderChecked(false);
  };

  const tableViewContextProviderValues = {
    isTableHeaderChecked: isTableHeaderChecked,
    onToggleTableHeaderCheckbox: tableHeadercheckBoxToggleHandler,
    onUncheckTableHeaderCheckbox: uncheckTableHeaderCheckbox,
  };

  return (
    <TableViewContext.Provider
      {...props}
      value={tableViewContextProviderValues}
    >
      {props.children}
    </TableViewContext.Provider>
  );
};

export default TableViewContext;
