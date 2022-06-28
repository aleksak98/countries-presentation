import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Select from "react-select";
import axios from "axios";
import Country from "../components/Country";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const HomePage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountires, setFileredCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      const countries = res.data;
      setLoading(false);
      setCountries(countries);
      setFileredCountries(countries);
    });
  }, []);

  const options = [
    { value: "africa", label: "Africa" },
    { value: "america", label: "America" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 1,
      paddingLeft: 15,
      paddingTop: 5,
      paddingBottom: 5,
      backgroundColor: theme === "light" ? "#fff" : "hsl(209, 23%, 22%)",
      color: state.isSelected ? "hsl(0, 0%, 52%)" : theme === "light" ? "#000" : "#fff",
      fontWeight: 600,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: 0,
    }),
  };

  const handleChangeSearch = (search) => {
    setSearch(search);
    setLoading(true);
    setCountries(countries);
    if (search !== "") {
      const filteredCountriesF = countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()) &&
          country.region.toLowerCase().includes(selectedOption.toLowerCase())
      );
      setFileredCountries(filteredCountriesF);
      setLoading(false);
    } else {
      if (selectedOption === "") {
        axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
          const countries = res.data;
          setLoading(false);
          setCountries(countries);
          setFileredCountries(countries);
        });
      } else {
        axios.get(`https://restcountries.com/v3.1/region/${selectedOption}`).then((res) => {
          const countries = res.data;
          setLoading(false);
          setCountries(countries);
          setFileredCountries(countries);
        });
      }
    }
  };

  const handleChangeFilterOption = (option) => {
    setSelectedOption(option.label);
    setLoading(true);
    setCountries(countries);
    if (search === "") {
      axios.get(`https://restcountries.com/v3.1/region/${option.label}`).then((res) => {
        const countries = res.data;
        setLoading(false);
        setFileredCountries(countries);
      });
    } else {
      const filteredCountriesF = countries.filter(
        (country) =>
          country.region.toLowerCase().includes(option.label.toLowerCase()) &&
          country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFileredCountries(filteredCountriesF);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="container-home">
          <div className="container">
            <div className="search-wrapper">
              <div className="search">
                <img
                  src={
                    theme === "light"
                      ? "images/magnifying-glass-solid.svg"
                      : "images/magnifying-glass-solid - white.svg"
                  }
                  alt="search"
                  className="search-icon"
                />
                <form>
                  <input
                    type="search"
                    placeholder="Search for a country..."
                    className="search-input"
                    value={search}
                    onChange={(value) => handleChangeSearch(value.target.value)}
                  />
                </form>
              </div>
              <div className="filter">
                <Select
                  defaultValue={selectedOption}
                  onChange={(opt) => handleChangeFilterOption(opt)}
                  options={options}
                  placeholder="Filter by Region"
                  styles={customStyles}
                  className="react-select-custom"
                />
              </div>
            </div>
            {loading && filteredCountires.length < 1 && <div className="loading">Loading countries...</div>}
            {!loading && filteredCountires.length < 1 && <div className="loading">No countries.</div>}
            <div className="countries-wrapper">
              {filteredCountires.length > 0 &&
                filteredCountires.map((item, key) => (
                  <Link to={`/single-country/${item.name.common}`} key={key} className="country-wrapper">
                    <Country country={item} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
