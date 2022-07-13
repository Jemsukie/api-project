//import useCities from "../scripts/useCities";
import useCityList from "../scripts/useCityList";

const CityTable = () => {
  const { cityList, loading } = useCityList("");

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {cityList.map((city) => {
        return <p>{city.city}</p>;
      })}
    </div>
  );
};

export default CityTable;
