import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = (props) => {
  let cssClass = styles["button"];
  if (props.className) {
    cssClass += ` ${props.className}`;
  }
  return (
    <button
      className={cssClass}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
