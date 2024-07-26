import axios from 'axios';
import { useEffect, useState } from 'react';

export const useUserName = () => {
  let [name, setName] = useState('');
  useEffect(() => {
    axios
      .get('/username.json')
      .then((r) => {
        setName(r.data);
      })
      .catch(setName('가져오지 못했음.'));
  }, []);

  return name;
};
