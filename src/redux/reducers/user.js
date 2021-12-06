import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode";

const initialState = {
  phoneNumber : "",
  userId : "",
}

if(!!localStorage.getItem('token')){
  const decoded = jwtDecode(localStorage.getItem('token'));
  initialState.phoneNumber = decoded.phoneNumber
  initialState.userId = decoded.userId
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, { payload }) => {
      const { phoneNumber, userId } = payload
      state = { phoneNumber, userId }
      return state
    }
  }
})

export { userSlice }

export default userSlice.reducer
