import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/index";
import SingleCountry from "./pages/single-country";

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme };

  return (
    <div className="App" id={theme}>
      <ThemeContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/single-country/:name" element={<SingleCountry />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
