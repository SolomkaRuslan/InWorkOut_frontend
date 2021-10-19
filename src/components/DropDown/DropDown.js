import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import "./DropDown.css";

const DropDown = ({ classes, options, selectedValue, title, handleChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`dropdown ${classes} ${open && " dropdown-open"}`}
      onClick={() => {
        console.log("OPEN/CLOSE");
        setOpen((old) => !old);
      }}
    >
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <div className="drowpdown-title">
          {selectedValue ? selectedValue : title}
          <FaAngleDown />
        </div>
        {open && (
          <div className="dropdown-options">
            <div
              className={
                !selectedValue
                  ? "dropdown-option option-selected"
                  : "dropdown-option"
              }
              onClick={() => {
                handleChange(null);
              }}
            >
              {title}
            </div>

            {options.map((option) => (
              <div
                key={option}
                className={
                  option === selectedValue
                    ? "dropdown-option option-selected"
                    : "dropdown-option"
                }
                onClick={() => {
                  option === selectedValue
                    ? handleChange(null)
                    : handleChange(option);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default DropDown;
