import React, { ChangeEvent, FC, useState } from "react";
import { getCountryByName } from "../../api/apiService";
import "./InputCountryAutocomplete.css";

type TSuggestion = {
  name: string;
  fullName: string;
  flag: string;
};

interface InputCountryAutocompleteProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  suggestionLimit?: number;
}

const InputCountryAutocomplete: FC<InputCountryAutocompleteProps> = ({
  placeholder,
  onChange,
  suggestionLimit,
}) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<TSuggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState("");

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setShowSuggestions(true);
    setUserInput(inputValue);
    if (typeof inputValue === "string") {
      const newFilteredSuggestions = await getCountryByName(inputValue);
      setFilteredSuggestions(newFilteredSuggestions);
    }
  };
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setUserInput(filteredSuggestions[activeSuggestionIndex].name);
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      setUserInput(filteredSuggestions[activeSuggestionIndex].name);
      setShowSuggestions(false);
      setActiveSuggestionIndex(0);
    } else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <div className="suggestions-container">
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let isActive;
              if (index === activeSuggestionIndex) {
                isActive = true;
              }
              if (suggestionLimit && index >= suggestionLimit) {
                return null;
              }
              return (
                <li
                  className={
                    "suggestion" + (isActive ? " suggestion-active" : "")
                  }
                  key={suggestion.fullName}
                  onClick={onClick}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                >
                  {suggestion.flag && (
                    <img
                      className="suggestion-flag"
                      src={suggestion.flag}
                      alt={suggestion.name}
                    />
                  )}
                  {suggestion.name || ""}, {suggestion.fullName || ""}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      suggestionsListComponent = (
        <div className="suggestions-container">
          <div className="no-suggestions">
            <em>Нет совпадений.</em>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="container-autocomplete">
      <input
        type="text"
        onChange={onChange || onChangeHandler}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder={placeholder || ""}
        onFocus={() => setShowSuggestions(true)}
      />
      {suggestionsListComponent}
    </div>
  );
};

export default InputCountryAutocomplete;
