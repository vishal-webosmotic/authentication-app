import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, payload) => {
      const { payload: userInfo } = payload;
      state.userInfo = userInfo;
    },
  },
});

export const { setToken, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
