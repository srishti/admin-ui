import React, { useEffect, useState, useContext } from "react";
import PageButton from "./PageButton";
import * as constants from "../../../utils/constants";
import TableViewContext from "../../../context/UI/table-view-context";
import styles from "./Pagination.module.css";

/**
 * Function to get number of pages to be displayed
 * @param {Number} itemsCount - number of items displayed in the table view
 * @return {Number} - number of pages to be displayed
 */
const getPageCount = (itemsCount) => {
  return Math.ceil(itemsCount / constants.PAGE_LIMIT);
};

const Pagination = (props) => {
  const [pageCount, setPageCount] = useState(null);
  const tableViewContext = useContext(TableViewContext);

  /**
   * Function as event handler for selecting a page
   * @param {*} pageNumber - page number to be selected
   */
  const selectPage = (pageNumber) => {
    tableViewContext.onUncheckTableHeaderCheckbox();
    props.onSelectPage(+pageNumber);
  };

  /**
   * Function to go to the first page in the pagination list
   */
  const goToFirstPage = () => {
    selectPage(1);
  };

  /**
   * Function to go to the last page in the pagination list
   */
  const goToLastPage = () => {
    selectPage(pageCount);
  };

  /**
   * Function to go to the previous page (in relation to the currently selected page) in the pagination list
   */
  const goToPreviousPage = () => {
    selectPage(props.currentPage - 1);
  };

  /**
   * Function to go to the next page (in relation to the currently selected page) in the pagination list
   */
  const goToNextPage = () => {
    selectPage(props.currentPage + 1);
  };

  /**
   * Function to render JSX for displaying pages
   * @return {*}
   */
  const renderPages = () => {
    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
      const isCurrentPage = props.currentPage === i;
      pages.push(
        <PageButton key={i} selected={isCurrentPage} onClick={selectPage}>
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  useEffect(() => {
    setPageCount(getPageCount(props.itemsCount));
  }, [props.itemsCount]);

  return (
    <div className={styles["pagination"]}>
      <PageButton onClick={goToFirstPage} disabled={props.currentPage <= 1}>
        {"<<"}
      </PageButton>
      <PageButton onClick={goToPreviousPage} disabled={props.currentPage <= 1}>
        {"<"}
      </PageButton>
      {renderPages()}
      <PageButton
        onClick={goToNextPage}
        disabled={props.currentPage === pageCount}
      >
        {">"}
      </PageButton>
      <PageButton
        onClick={goToLastPage}
        disabled={props.currentPage === pageCount}
      >
        {">>"}
      </PageButton>
    </div>
  );
};

export default Pagination;
