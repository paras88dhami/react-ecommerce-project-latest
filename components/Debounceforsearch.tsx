import { useEffect, useState } from "react";

export  function useDebouncedValue<T>(value:T, time:number):T {
  const [debounced, setDebounced] = useState<T>(value);
 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);

  return debounced;
}