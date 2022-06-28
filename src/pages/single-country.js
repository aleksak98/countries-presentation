import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { ThemeContext } from "../App";

const SingleCountry = () => {
  const name = useParams();
  let navigate = useNavigate();
  const [country, setCountry] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewOnMap, setViewOnMap] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const [center, setCenter] = useState({});
  const [zoom, setZoom] = useState(7);
  const ref = useRef(null);

  useEffect(() => {
    setViewOnMap(false);
    if (!searchParams.get("border")) {
      axios.get(`https://restcountries.com/v3.1/name/${name.name}?fullText=true`).then((res) => {
        const countries = res.data;
        setCountry(countries[0]);
        document.title = countries[0]?.name?.common;
        let center;
        center = {
          lat: countries[0].latlng[0],
          lng: countries[0].latlng[1],
        };
        setCenter({ ...center });
        if (countries[0].area > 1000000) {
          setZoom(2);
        } else {
          setZoom(7);
        }
      });
    } else {
      axios.get(`https://restcountries.com/v3.1/alpha/${name.name}`).then((res) => {
        const countries = res.data;
        setCountry(countries[0]);
        let center;
        center = {
          lat: countries[0].latlng[0],
          lng: countries[0].latlng[1],
        };
        setCenter({ ...center });
        if (countries[0].area > 1000000) {
          setZoom(2);
        } else {
          setZoom(7);
        }
      });
    }
  }, [name, searchParams]);

  const handleViewMap = () => {
    setViewOnMap(true);
    setTimeout(() => {
      ref.current.scrollIntoView();
    }, 100);
  };

  const MapComponent = ({ text }) => <div>{text}</div>;

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <div className="button-wrapper">
            <button onClick={() => navigate("/")}>
              <img
                src={
                  theme === "light" ? "/images/arrow-left-long-solid.svg" : "/images/arrow-left-long-solid - white.svg"
                }
                alt="back"
                className="back-icon"
              />
              <span>Back</span>
            </button>
          </div>
          {country && (
            <div className="single-country-wrapper">
              <div className="single-country-flag">
                <img src={country?.flags?.svg} alt={country?.name?.common} className="single-country-flag-image" />
              </div>
              <div className="single-country-info">
                <h1 className="single-country-title">{country.name.common}</h1>
                <div className="single-country-detail-info">
                  <div>
                    <div className="single-country-row">
                      <span className="label">Native Name: &nbsp;</span>
                      {country.name.nativeName && (
                        <span className="value">{Object.values(country.name.nativeName)[0]?.common}</span>
                      )}
                    </div>
                    <div className="single-country-row">
                      <span className="label">Population: &nbsp;</span>
                      <span className="value">{country?.population.toLocaleString()}</span>
                    </div>
                    <div className="single-country-row">
                      <span className="label">Region: &nbsp;</span>
                      <span className="value">{country?.region}</span>
                    </div>
                    <div className="single-country-row">
                      <span className="label">Sub Region: &nbsp;</span>
                      <span className="value">{country?.subregion}</span>
                    </div>
                    <div className="single-country-row">
                      <span className="label">Capital: &nbsp;</span>
                      <span className="value">{country?.capital}</span>
                    </div>
                  </div>
                  <div className="bottom-info">
                    <div className="single-country-row">
                      <span className="label">Top Level Domain: &nbsp;</span>
                      <span className="value">{country?.tld}</span>
                    </div>
                    <div className="single-country-row">
                      <span className="label">Currencies: &nbsp;</span>
                      {country.currencies && <span className="value">{Object.values(country.currencies)[0].name}</span>}
                    </div>
                    <div className="single-country-row">
                      <span className="label">Languages: &nbsp;</span>
                      {country.languages &&
                        Object.entries(country.languages).map(([key, value], index) => (
                          <span key={key} className="value">
                            {value}
                            {index !== Object.entries(country.languages).length - 1 && ", "}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <button onClick={() => handleViewMap()}>
                    <span>View on map</span>
                  </button>
                </div>
                <div className="single-country-row border-countries">
                  <span className="label title-border">Border Countries: &nbsp;</span>
                  <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "5px" }} className="border-wrapper">
                    {country.borders &&
                      country.borders.length >= 1 &&
                      country.borders.map((item, key) => {
                        return (
                          <Link to={`/single-country/${item}?border=true`} key={key}>
                            <button style={{ marginRight: "10px", width: "100px", marginBottom: "10px" }}>
                              <span>{item}</span>
                            </button>
                          </Link>
                        );
                      })}
                    {!country.borders && <span className="no-border">No border countries.</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewOnMap && (
            <div className="map-wrapper" ref={ref}>
              <div>
                <h3 className="country-name-map">{country?.name?.common} on map:</h3>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  paddingBottom: "30px",
                  flexDirection: "column",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ height: "600px", width: "700px" }} className="map">
                  <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
                    <MapComponent lat={center.lat} lng={center.lng} />
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SingleCountry;
