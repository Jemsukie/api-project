import { useEffect, useState } from "react";
import parse from "html-react-parser";
//import cities from "../scripts/cities";

const Container = () => {
  //const endpoint =
  //"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
  //passage([endpoint], readFetch).then((data) => cities.push(...data));

  const [phrase, setPhrase] = useState("");
  const [cities, setCities] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    fetch(endpoint)
      .then((d) => d.json())
      .then((d) => setCities(d));
  }, []);

  useEffect(() => {
    setDisplayList(displayMatches(phrase, cities));
  }, [phrase, cities]);

  return (
    <div className="container-search">
      <input
        type="text"
        placeholder="City or State"
        onChange={(event) => setPhrase(event.target.value)}
      />
      <br />
      <span>(↑) Type here to check cities (↑)</span>
      <Count list={displayList} />
    </div>
  );
};

const Count = (props) => {
  return (
    <ul>
      {props.list.map((item, index) => {
        return (
          <li key={index}>
            <span className="name">
              {item.cityName}, {item.stateName}
              <>&nbsp;</>
            </span>
            <span className="population">{item.population}</span>
          </li>
        );
      })}
    </ul>
  );
};

const displayMatches = (city, cities) => {
  let matchArray = findMatches(city, cities); // Find match of input from array of object cities

  return matchArray.map((place) => {
    // const regex = new RegExp(city, "gi"); // Find all match in the strings and ignore cases
    // Then we'll render the lists as highlighted

    let regex = "";
    let cityName = place.city;
    let stateName = place.state;

    if (city !== "") {
      regex = new RegExp(city, "gi"); // Find all match in the strings and ignore cases
      // Then we'll render the lists as highlighted
      cityName = place.city.replace(
        regex,
        `<span class="highlight">${city}</span>`
      );
      stateName = place.state.replace(
        regex,
        `<span class="highlight">${city}</span>`
      );
    }

    return {
      cityName: parse(cityName),
      stateName: parse(stateName),
      population: numberWithCommas(place.population),
    };
  });
};

function numberWithCommas(x) {
  // We'll normalize the population number
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // This is a formula to put commas in the numbers
}

const findMatches = (wordToMatch, cities) => {
  if (wordToMatch === "") {
    return cities;
  } else {
    return (
      cities.filter((place) => {
        // We'll use place as our element identifier
        const regex = new RegExp(wordToMatch, "gi"); // Find all match in the strings and ignore cases
        return place.city.match(regex) || place.state.match(regex); // If we found city or state that matches our input
      }) || []
    );
  }
};

/*
const passage = async (input, callback) => {
  const result = await callback(input);
  return result;
};

const readFetch = async ([endpoint]) => {
  const res = await fetch(endpoint); // Let's fetch the json from the link given
  const data = await res.json();
  return data;
};
*/

export default Container;
