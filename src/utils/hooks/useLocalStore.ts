import { useState, useEffect } from "react";

export default function useLocalStore<T>(key: string, value?: T) {
  const [localValue, setLocalValue] = useState<T | null>();

  // Sets local cached value if there is a value
  useEffect(() => {
    if (value !== undefined && localStorage.getItem(key) !== null)
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //update cached value with state
  useEffect(() => {
    if (localValue !== undefined)
      localStorage.setItem(key, JSON.stringify(localValue));
  }, [key, localValue]);

  return [localValue, setLocalValue];
}
