import React, { useEffect, useState } from "react";
import PageButton from "./PageButton";
import * as constants from "../../../utils/constants";
import styles from "./Pagination.module.css";

/**
 * Function to get number of pages to be displayed
 * @param {Number} itemCount - number of items displayed in the table view
 * @return {Number} - number of pages to be displayed
 */
const getPageCount = (itemCount) => {
  return Math.ceil(itemCount / constants.PAGE_LIMIT);
};

const Pagination = (props) => {
  console.log("[Pagination] rendered");

  const [pageCount, setPageCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Function as event handler for selecting a page
   * @param {*} pageNumber - page number to be selected
   */
  const selectPage = (pageNumber) => {
    setCurrentPage(+pageNumber);
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
    selectPage(currentPage - 1);
  };

  /**
   * Function to go to the next page (in relation to the currently selected page) in the pagination list
   */
  const goToNextPage = () => {
    selectPage(currentPage + 1);
  };

  /**
   * Function to render JSX for displaying pages
   * @return {*}
   */
  const renderPages = () => {
    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <PageButton key={i} selected={currentPage === i} onClick={selectPage}>
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  useEffect(() => {
    setPageCount(getPageCount(props.itemCount));
  }, [props.itemCount]);

  return (
    <div className={styles.pagination}>
      <PageButton onClick={goToFirstPage} disabled={currentPage <= 1}>
        {"<<"}
      </PageButton>
      <PageButton onClick={goToPreviousPage} disabled={currentPage <= 1}>
        {"<"}
      </PageButton>
      {renderPages()}
      <PageButton onClick={goToNextPage} disabled={currentPage === pageCount}>
        {">"}
      </PageButton>
      <PageButton onClick={goToLastPage} disabled={currentPage === pageCount}>
        {">>"}
      </PageButton>
    </div>
  );
};

export default Pagination;
