import { useEffect, useState } from "react";
import { UseFetchReturn } from '../types'

function useFetch<DataType>(url: string, key: string | null ): UseFetchReturn<DataType> {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setData(key ? data[key] : data));
  }, [url]);

  return [data, setData];
}

export default useFetch;
