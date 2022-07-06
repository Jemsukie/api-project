import { useEffect, useState } from "react";

const Container = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    fetch(endpoint)
      .then((d) => d.json())
      .then((d) => setCities(d))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredCities = cities.filter((city) =>
        `${city.city} ${city.state}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filteredCities);
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm, cities]);

  if (loading) {
    return (
      <div className="container-search">
        <span id="count">Loading</span>
      </div>
    );
  }

  return (
    <div className="container-search">
      <input
        type="text"
        className="search"
        placeholder="City or State"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      {searchTerm && filteredCities.length > 0 ? (
        <span id="count">
          {filteredCities.length} cities found for "<b>{searchTerm}</b>"
        </span>
      ) : (
        <>
          <span id="count">(↑) Type here to check cities (↑)</span>
          <span id="count">Filter for a city or a state</span>
        </>
      )}

      <ul className="suggestions">
        {filteredCities.map((city) => (
          <li key={city.rank}>
            <span className="name">
              <TextWithHighlight
                term={searchTerm}
                text={`${city.city}, ${city.state}`}
              />
            </span>{" "}
            <span className="poulation">{city.population}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TextWithHighlight = ({ text = "", term = "" }) => {
  if (!term.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${term})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <>
            {/*<mark key={i}>{part}</mark>*/}
            <span key={i} className="highlight">
              {part}
            </span>
          </>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

export default Container;
