import React from "react";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import PropTypes from "prop-types";
import styles from "./TableFooter.module.css";

const TableFooter = (props) => {
  return (
    <div className={styles["table-footer"]}>
      <Button
        className={styles["table-footer-button"]}
        onClick={props.onDeleteMultipleRows}
      >
        Delete Selected
      </Button>
      <Pagination
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        onSelectPage={props.onSelectPage}
      />
    </div>
  );
};

TableFooter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  onDeleteMultipleRows: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
};

export default TableFooter;
