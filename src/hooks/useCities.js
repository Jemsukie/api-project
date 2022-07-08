import { useState, useEffect } from "react";

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
    fetch(endpoint)
      .then((d) => d.json())
      .then((d) => setCities(d))
      .finally(() => setLoading(false));
  }, []);

  return { cities, loading };
};
