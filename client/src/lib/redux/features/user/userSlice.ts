import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
   userDetails: {}
  },
  reducers: {
    addUserDetails: (state,action) => {
     state.userDetails = action.payload
    },
    logout: (state, action) => {
      debugger;
      state.userDetails = {}
    }
  }
})


export const { addUserDetails, logout } = userSlice.actions

export default userSlice.reducer