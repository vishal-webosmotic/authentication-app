import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, payload) => {
      const { payload: userInfo } = payload;
      state.userInfo = userInfo;
    },
  },
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
