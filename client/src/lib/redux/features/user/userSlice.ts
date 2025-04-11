import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
   userDetails: {},
   selectedUser: {},
   openDetails: false,
  },
  reducers: {
    addUserDetails: (state,action) => {
     state.userDetails = action.payload
    },
    logout: (state, action) => {
      state.userDetails = {}
    },
    addSelectedUser: (state, action) => {
      state.selectedUser =  action.payload
    },
  }
})


export const { addUserDetails, logout ,addSelectedUser} = userSlice.actions

export default userSlice.reducer