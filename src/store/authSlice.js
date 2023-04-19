import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  conversionList: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, payload) => {
      const { payload: userInfo } = payload;
      state.userInfo = userInfo;
    },
    setConversionList: (state, payload) => {
      state.conversionList = { payload };
    },
  },
});

export const { setUserInfo, setConversionList } = authSlice.actions;

export default authSlice.reducer;
