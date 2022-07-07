import { useState, useEffect } from "react";

const useCities = (endpoint) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(endpoint)
      .then((d) => d.json())
      .then((d) => setCities(d))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { cities, loading };
};

export default useCities;
