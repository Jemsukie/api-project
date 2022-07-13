import { useState, useEffect } from "react";

const useCityList = () => {
  const endpoint = "http://localhost:4000/graphql";

  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "query { cities{ rank, city, state, population } }",
    }),
  };

  useEffect(() => {
    fetch(endpoint, request)
      .then((d) => d.json())
      .then((d) => setCityList(d.data.cities))
      .finally(() => setLoading(false));
  });

  return { cityList, loading };
};

export default useCityList;
