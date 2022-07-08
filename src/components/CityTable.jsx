import { useCities } from "../hooks/useCities";

// "city":"New York","growth_from_2000_to_2013":"4.8%","latitude":40.7127837,"longitude":-74.0059413,"population":"8405837","rank":"1","state":"New York"

const CityTable = () => {
  const { cities, loading } = useCities();

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>City</td>
            <td>State</td>
            <td>Population</td>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.rank}>
              <td>{city.city}</td>
              <td>{city.state}</td>
              <td>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(cities)}</pre>
    </>
  );
};

export default CityTable;
