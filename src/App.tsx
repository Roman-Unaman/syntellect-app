import React, { useState } from "react";
import "./App.css";
import InputWithAutocomplete from "./components/InputWithAutocomplete/InputWithAutocomplete";
import InputWithButtons, {
  Locations,
} from "./components/InputWithButtons/InputWithButtons";

function App() {
  const [firstInputValue, setFirstInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");

  return (
    <div className="root">
      <InputWithButtons
        value={firstInputValue}
        onChange={(e) => setFirstInputValue(e.target.value)}
        buttons={[
          {
            name: "RESET",
            action: () => setFirstInputValue(""),
          },
          {
            name: "Hello world!",
            action: () => setFirstInputValue("Hello world!"),
          },
        ]}
      />
      <InputWithButtons
        value={secondInputValue}
        onChange={(e) => setSecondInputValue(e.target.value)}
        buttons={[
          {
            location: Locations.LEFT,
            name: "Alert number",
            action: () => {
              if (
                parseInt(secondInputValue) >= 0 ||
                parseInt(secondInputValue) <= 0
              ) {
                alert(secondInputValue);
              } else {
                alert("Введите число");
              }
            },
          },
          {
            name: "Alert input",
            action: () => alert(secondInputValue),
          },
        ]}
      />
      <InputWithAutocomplete suggestionLimit={3} />
      <InputWithAutocomplete suggestionLimit={10} />
    </div>
  );
}

export default App;
