import React, { useState } from "react";
import "./assets/App.css";
import InputCountryAutocomplete from "./components/inputCountryAutocomplete";
import InputWithButtons from "./components/inputWithButtons";
import { Locations } from "./components/inputWithButtons/InputWithButtons";

function App() {
  // Mobx не использовал, т.к. не вижу в нем необходимости
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
              if (secondInputValue && !isNaN(parseInt(secondInputValue))) {
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
      <InputCountryAutocomplete suggestionLimit={3} />
      <InputCountryAutocomplete suggestionLimit={10} />
    </div>
  );
}

export default App;
