import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  username: null,
  password: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.password.name;
    },
    defaultState: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
