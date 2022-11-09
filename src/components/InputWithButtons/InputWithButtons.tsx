import React, { ChangeEvent, FC, useState } from "react";
import "./InputWithButtons.css";

interface InputWithButtonsProps {
  buttons?: TButton[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

export enum Locations {
  LEFT = "left",
  RIGHT = "right",
}

type TButton = {
  location?: Locations.LEFT | Locations.RIGHT;
  name?: string;
  action?: Function;
};

const InputWithButtons: FC<InputWithButtonsProps> = ({
  buttons,
  placeholder,
  value,
  onChange,
}) => {
  const [_value, setValue] = useState("");
  if (buttons) {
    const tempButtonsArray = [...buttons];
    const leftButtons = tempButtonsArray.filter(
      (button: TButton) => button.location === Locations.LEFT
    );
    const rightButtons = tempButtonsArray.filter(
      (button: TButton) => button.location !== Locations.LEFT
    );

    return (
      <div className="container">
        {leftButtons.map((button, index) => {
          return (
            <button key={index} onClick={() => button.action?.()}>
              {button.name || " "}
            </button>
          );
        })}
        <input
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            } else {
              setValue(e.target.value);
            }
          }}
          placeholder={placeholder ? placeholder : ""}
        />
        {rightButtons.map((button, index) => {
          return (
            <button key={index} onClick={() => button.action?.()}>
              {button.name || " "}
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="container">
        <input
          value={value || _value}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            } else {
              setValue(e.target.value);
            }
          }}
          placeholder={placeholder ? placeholder : ""}
        />
      </div>
    );
  }
};

export default InputWithButtons;
