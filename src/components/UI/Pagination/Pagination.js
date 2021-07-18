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
  return Math.ceil(itemCount / constants.PAGE_COUNT);
};

const Pagination = (props) => {
  console.log("[Pagination] rendered");

  const [pageCount, setPageCount] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);

  /**
   * Function to go to the first page in the pagination list
   */
  const goToFirstPage = () => {
    setSelectedPage(1);
  };

  /**
   * Function to go to the last page in the pagination list
   */
  const goToLastPage = () => {
    setSelectedPage(pageCount);
  };

  /**
   * Function to go to the previous page (in relation to the currently selected page) in the pagination list
   */
  const goToPreviousPage = () => {
    setSelectedPage((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  };

  /**
   * Function to go to the next page (in relation to the currently selected page) in the pagination list
   */
  const goToNextPage = () => {
    setSelectedPage((prevState) =>
      prevState < pageCount ? prevState + 1 : prevState
    );
  };

  /**
   * Function as event handler for selecting a page
   * @param {*} pageNumber - page number to be selected
   */
  const selectPage = (pageNumber) => {
    setSelectedPage(+pageNumber);
  };

  /**
   * Function to render JSX for displaying pages
   * @return {*}
   */
  const renderPages = () => {
    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <PageButton key={i} selected={selectedPage === i} onClick={selectPage}>
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
      <PageButton onClick={goToFirstPage} disabled={selectedPage <= 1}>
        {"<<"}
      </PageButton>
      <PageButton onClick={goToPreviousPage} disabled={selectedPage <= 1}>
        {"<"}
      </PageButton>
      {renderPages()}
      <PageButton onClick={goToNextPage} disabled={selectedPage === pageCount}>
        {">"}
      </PageButton>
      <PageButton onClick={goToLastPage} disabled={selectedPage === pageCount}>
        {">>"}
      </PageButton>
    </div>
  );
};

export default Pagination;
