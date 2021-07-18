import React from "react";
import styles from "./PageButton.module.css";

const PageButton = (props) => {
  console.log("[PageButton] rendered");

  let cssClass = styles["page-button"];
  if (props.selected) {
    cssClass += ` ${styles.selected}`;
  }
  if (props.disabled) {
    cssClass += ` ${styles.disabled}`;
  }

  const pageClickHandler = (event) => {
    props.onClick(event.target.innerText);
  };

  return (
    <button
      type="button"
      className={cssClass}
      onClick={pageClickHandler}
      disabled={props.disabled}
    >
      <span>{props.children}</span>
    </button>
  );
};

export default PageButton;
