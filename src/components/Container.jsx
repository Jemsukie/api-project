//import '../scripts/script.js';

import { useEffect, useState } from "react";

const Container = () => {

    const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    const cities = [];
    
    passage([endpoint], readFetch).then(data => cities.push(...data));

    useEffect(()=>{
        
        const count = document.getElementById('count');
        
        const searchInput = document.querySelector('.search'); // Let's get the input field
        const suggestions = document.querySelector('.suggestions'); // Let's get the lists elements

        searchInput.addEventListener('change', displayMatches); // Listen for changes and
        searchInput.addEventListener('keyup', displayMatches); // keyups in the input field

        function findMatches(wordToMatch, cities) {
            return cities.filter(place => { // We'll use place as our element identifier
              const regex = new RegExp(wordToMatch, 'gi'); // Find all match in the strings and ignore cases
              return place.city.match(regex) || place.state.match(regex); // If we found city or state that matches our input
            });
        }
          
        function displayMatches() {
            const matchArray = findMatches(this.value, cities); // Find match of input from array of object cities
            const matchingMap = matchArray.map(place => {
              const regex = new RegExp(this.value, 'gi'); // Find all match in the strings and ignore cases
              // Then we'll render the lists as highlighted
              const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
              const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
              return `
                      <li>
                          <span class="name">${cityName}, ${stateName}</span>
                          <span class="poulation">${numberWithCommas(place.population)}</span>
                      </li>
                  `;
            }).join(''); // Let's join the string array made
            if (this.value !== '') { // If the input field has values, let's put some data
              suggestions.innerHTML = matchingMap; // Let's render the matches to the page
              count.innerHTML = `${matchArray.length} cities found for "<b>${this.value}</b>"`;
            } else { // Return to original state if the input field is empty
              suggestions.innerHTML = `<li>Filter for a city</li><li>or a state</li>`;
              count.innerHTML = `(↑) Type here to check cities (↑)`;
            }
          
        }
          
        function numberWithCommas(x) { // We'll normalize the population number
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // This is a formula to put commas in the numbers
        }

    }, [cities])

    return (
        <div className="container-search">
            <input type="text" className="search" placeholder="City or State" />
            <br /><br />
            <span id="count">(↑) Type here to check cities (↑)</span>
            <ul className="suggestions">
            <li>Filter for a city</li>
            <li>or a state</li>
            </ul>
        </div>
    )
}

const passage = async(input, callback) => {
    const result =  await callback(input);
    return result;
}

const readFetch = async([endpoint]) => {
    const res = await fetch(endpoint); // Let's fetch the json from the link given
    //.then(blob => blob.json())
    //.then(data => cities.push(...data)); // We'll push every object into the array cities
    const data = await res.json();
    return data;
}

export default Container;