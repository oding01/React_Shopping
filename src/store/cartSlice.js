import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const incrementCount = (state, id, count) => {
  let item = state.find((i) => i.id === id);
  if (item) {
    item.count += count;
  }
};

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    plusCount(state, action) {
      incrementCount(state, action.payload.id, action.payload.count);
    },
    addInCart(state, action) {
      const isHave = state.find((item) => item.id === action.payload.id);
      if (isHave) {
        incrementCount(state, action.payload.id, action.payload.count);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export let { plusCount, addInCart } = cart.actions;
export default cart;
