import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'counter',
  initialState: {
   isNotified: false,
   notificationList: []
  },
  reducers: {
    setNotification: (state,action) => {
      state.isNotified = action.payload
    },
    setNotificationList: (state,action) => {
      state.notificationList = action.payload
    },
  }
})


export const {setNotification,setNotificationList} = notificationSlice.actions

export default notificationSlice.reducer