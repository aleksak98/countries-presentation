import React from "react";

const Country = (props) => {
  const country = props.country;

  return (
    <div>
      <img src={country.flags.svg} alt={country.name.common} className="country-image" />
      <div className="information-wrapper">
        <div className="name-wrapper">
          <h2 className="country-name">{country?.name?.common}</h2>
        </div>
        <div className="population-wrapper">
          <span className="label">Population: </span>
          <span className="value">{country?.population.toLocaleString()}</span>
        </div>
        <div className="region-wrapper">
          <span className="label">Region: </span>
          <span className="value">{country?.region}</span>
        </div>
        <div className="capital-wrapper">
          <span className="label">Capital: </span>
          <span className="value">{country?.capital}</span>
        </div>
      </div>
    </div>
  );
};

export default Country;
