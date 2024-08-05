import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url, options = {}) => {
  const { method = 'GET', body = null, headers = {}, immediate = true } = options;
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({ url, method, data: body, headers });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [url, method, body, headers, immediate]);

  return { data, error, loading, refetch: fetchData };
};

export default useApi;