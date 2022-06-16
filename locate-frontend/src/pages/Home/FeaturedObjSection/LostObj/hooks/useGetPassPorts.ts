//import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import useFetch from '../../../../../lib/hooks/useFetch';
import { TObject } from '../../../../PostObject';

export default function useGetPassports() {
  const [isLoading, setIsLoading] = useState(true);
  const [object, setObject] = useState<TObject[]>();

  const Fetcher = () => useFetch({ path: 'api/Passports', requestType: 'GET' });

  useEffect(function F() {
    if (isLoading) {
      const json = Fetcher();
      json && json.then((json) => {
        setObject(json);
        setIsLoading(false);
        return object;
      });
    }
    F();
  }, []);
}
