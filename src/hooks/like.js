import { useState } from 'react';

export const useLike = () => {
  let [like, setLike] = useState(0);
  const addLike = () => {
    setLike((a) => a + 1);
  };
  return { like, setLike, addLike };
};
