import { useState } from 'react';

export const useMyHook = (initialValue: number): [number, () => void] => {
  const [count, setCount] = useState(initialValue);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  return [count, handleCount];
};
