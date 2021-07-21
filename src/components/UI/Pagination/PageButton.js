import React from "react";
import PropTypes from "prop-types";
import styles from "./PageButton.module.css";

const PageButton = (props) => {
  let cssClass = styles["page-button"];
  if (props.selected) {
    cssClass += ` ${styles["selected"]}`;
  }
  if (props.disabled) {
    cssClass += ` ${styles["disabled"]}`;
  }

  const pageClickHandler = (event) => {
    props.onClick(event.target.innerText);
  };

  return (
    <button
      type="button"
      className={cssClass}
      onClick={pageClickHandler}
      disabled={props.disabled || false}
    >
      <span>{props.children}</span>
    </button>
  );
};

PageButton.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PageButton;
