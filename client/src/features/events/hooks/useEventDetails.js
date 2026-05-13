import { useState, useEffect } from 'react';
import { eventsApi } from '../services/eventsApi';

export function useEventDetails(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await eventsApi.getById(id);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return { 
    event: data?.event, 
    similarEvents: data?.similarEvents, 
    loading, 
    error, 
    refetch: fetchDetails 
  };
}
