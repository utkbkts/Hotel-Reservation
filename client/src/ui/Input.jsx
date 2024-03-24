import React from "react";
import "../styles/input.scss";
const Input = ({ type, value, onChange, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={"input"}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
