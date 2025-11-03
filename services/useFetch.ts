import { useEffect, useState } from "react";

// The letter <T> in that TypeScript code snippet
//  represents a Type Parameter (or Generic Type).
// In simple terms, it's a placeholder for a data type
//  that will be decided later, when you actually use the useFetch function.

// You need to put the generic type parameter <T> immediately
//  after useFetch = to tell TypeScript that the function itself is
//  generic. This position is the standard and required syntax for defining
//  a Generic Function or a Generic Arrow Function in TypeScript

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
