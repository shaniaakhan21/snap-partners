import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode";

let isAuthenticate = false;

if(localStorage.getItem('token')){
  const claims = jwtDecode(localStorage.getItem('token'));
  const expiryTimestamp = claims.expiredAt || claims.exp * 1000;
  if(Date.now() > expiryTimestamp ){
    isAuthenticate = false;
    localStorage.removeItem('token')
    window.location.href = "/";
  }
}

const initialState = {
  isAuth: isAuthenticate
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      const { isAuth = false } = payload
      state = {
        isAuth: isAuth
      }
      return state
    }
  }
})

export default authSlice.reducer
