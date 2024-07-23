import { configureStore, createSlice } from '@reduxjs/toolkit';
import cart from './store/cartSlice';

let userName = createSlice({
  name: 'userName',
  initialState: '어진',
  reducers: {
    setUserName() {
      return '이어진';
    },
  },
});

export let { setUserName } = userName.actions;

export default configureStore({
  reducer: {
    userName: userName.reducer,
    cart: cart.reducer,
  },
});
