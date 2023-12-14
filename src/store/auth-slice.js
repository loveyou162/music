import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
