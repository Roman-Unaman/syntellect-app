import React, { ChangeEvent, FC } from "react";
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
  const renderButtons = (buttons: TButton[]): JSX.Element[] => {
    return buttons.map((button, index) => {
      return (
        <button key={index} onClick={() => button.action?.()}>
          {button.name || " "}
        </button>
      );
    });
  };
  let leftButtons: TButton[] = [];
  let rightButtons: TButton[] = [];
  if (buttons) {
    const tempButtonsArray = [...buttons];
    leftButtons = tempButtonsArray.filter(
      (button: TButton) => button.location === Locations.LEFT
    );
    rightButtons = tempButtonsArray.filter(
      (button: TButton) => button.location !== Locations.LEFT
    );
  }

  return (
    <div className="container">
      {leftButtons && renderButtons(leftButtons)}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
      />
      {rightButtons && renderButtons(rightButtons)}
    </div>
  );
};

export default InputWithButtons;
